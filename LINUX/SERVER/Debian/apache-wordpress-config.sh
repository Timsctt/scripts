#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BK_GREEN='\033[0;42m'
BK_NONE='\033[0m'
BOLD=$(tput bold)
NORM=$(tput sgr0)

echo -e "${GREEN}Updating${NORM}"
sudo apt update
echo -e "${GREEN}Installing ufw${NORM}"
sudo apt install ufw
ufw allow OpenSSH
ufw enable

#Basic debian plugins installation
echo -e "${GREEN}Install basic plugins${NORM}"
sudo apt install curl git vim htop ed

# Setup server
sudo apt -y install lsb-release apt-transport-https ca-certificates 
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
sudo apt update
echo -e "${GREEN}Setup apache server${NORM}"
sudo apt install apache2 php7.4
echo -e "${GREEN}Upgrading${NORM}"
sudo apt upgrade
sudo ufw allow 'WWW'

sudo systemctl restart apache2

# Setup Virtual Host
yes "-" | sed "$(tput cols)q" | tr -d '\n'
echo -e "${GREEN}Creation client's apche repository${NORM}"
read -p "Enter Your client's name: " client
sudo mkdir -p /var/www/$client
sudo chown -R $USER:$USER /var/www/$client
sudo chmod -R 755 /var/www/$client

sudo touch /etc/apache2/sites-available/$client.conf

yes "-" | sed "$(tput cols)q" | tr -d '\n'
echo -e "${GREEN}Setup Virtual Host${NORM}"
read -p "Enter admin's email: " adminemail

# Check email pattern
regexemail="^[a-z0-9!#\$%&'*+/=?^_\`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]([a-z0-9-]*[a-z0-9])?\$"

while ! [[ "$adminemail" =~ $regexemail ]] 
do
    echo -e "${RED}${BOLD}email pattern may respect${NC}${NORM} : email@domain.com"
    read -p "Enter admin's email: " adminemail
done

read -p "Enter domain's name: " domainname

sudo bash -c "cat << EOF > /etc/apache2/sites-available/$client.conf
<VirtualHost *:80>
     ServerAdmin $adminemail
    ServerName $domainname
    ServerAlias www.$domainname
    DocumentRoot /var/www/$client
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

<Directory /var/www/$client/>
    AllowOverride All
</Directory>
EOF"

echo -e "${GREEN}Enable apache client conf${NORM}"
sudo a2ensite $client.conf
echo -e "${GREEN}Disable apache default conf${NORM}"
sudo a2dissite 000-default.conf
echo -e "${GREEN}Apache config test :${NORM}"
sudo apache2ctl configtest
echo -e "${GREEN}Restarting apache${NORM}"
sudo systemctl restart apache2

# Download MySql
echo -e "${GREEN}Downloading mysql:8.16.1${NORM}"
wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb
sudo dpkg -i mysql-apt-config*
echo -e "${GREEN}Installing mysql-server${NORM}"
sudo apt install mysql-server

# Create mysql database
echo -e "${GREEN}Creating MySql Database${NORM}"
read -p "Choose a database name : " databasename

read -sp "Choose a database password: " dbpassword
echo 
read -sp "Confirm passwd : " confirmdbpassword
echo 

while [[ "$dbpassword" != $confirmdbpassword ]] 
do
    echo -e "${RED}${BOLD}Differents passwords${NC}${NORM}"
    read -sp "Password: " dbpassword
    echo 
    read -sp "Confirm passwd : " confirmdbpassword
    echo 
done

sudo mysql -e"
DROP DATABASE IF EXISTS $databasename;
CREATE DATABASE $databasename DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL ON $databasename.* TO '$USER'@'localhost' IDENTIFIED BY '$dbpassword';
FLUSH PRIVILEGES;
"

# Installing Additional PHP Extensions
echo -e "${GREEN}Installing Additional PHP Extensions${NORM}"
sudo apt install php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip php7.4-mysql

sudo a2enmod rewrite
echo "Test apache config"
sudo apache2ctl configtest
echo "Restarting apache"
sudo systemctl restart apache2


# WP-CLI
echo -e "${GREEN}Installing WordPress CLI${NORM}"
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

yes "-" | sed "$(tput cols)q" | tr -d '\n'
echo -e "${GREEN}Creating WordPress project${NORM}"
wp core download --locale=fr_FR --path=/var/www/$client/ --force

sudo cp /var/www/$client/wp-config-sample.php /var/www/$client/wp-config.php
sudo mkdir /var/www/$client/wp-content/upgrade


# Configuring the WordPress Directory
echo -e "${GREEN}Configuring the WordPress Directory${NORM}"
sudo chown -R  www-data:www-data /var/www/$client

sudo find /var/www/$client/ -type d -exec chmod 750 {} \;
sudo find /var/www/$client/ -type f -exec chmod 640 {} \;

# Changing initial wp-config.php
sudo sed -i "s/votre_nom_de_bdd/$databasename/" /var/www/$client/wp-config.php
sudo sed -i "s/votre_utilisateur_de_bdd/$USER/" /var/www/$client/wp-config.php
sudo sed -i "s/votre_mdp_de_bdd/$dbpassword/" /var/www/$client/wp-config.php

read -p "Choose a table_prefix [wp_]: " table_prefix
table_prefix=${table_prefix:-wp_}
if [ $table_prefix != "wp_" ] 
then
    sudo sed -i "s/wp_/$table_prefix/" /var/www/$client/wp-config.php
fi

SALT=$(curl -L https://api.wordpress.org/secret-key/1.1/salt/)
STRING='mettez une phrase unique ici'
printf '%s\n' "g/$STRING/d" a "$SALT" . w | sudo ed -s /var/www/$client/wp-config.php
