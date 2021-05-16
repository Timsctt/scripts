#!/bin/bash

echo "Updating"
sudo apt update
echo "Installing ufw"
sudo apt install ufw
ufw allow OpenSSH
ufw enable

#Basic debian installation
echo "Install basic plugins"
sudo apt install curl git vim htop ed

# Setup server
echo "Setup apache server"
sudo apt install apache2 php
echo "Upgrading"
sudo apt upgrade
sudo ufw allow 'WWW'

sudo systemctl restart apache2

# Setup Virtual Host
echo "Creation client's apche repository"
read -p "Enter Your client's name: " client
sudo mkdir -p /var/www/$client
sudo chown -R $USER:$USER /var/www/$client
sudo chmod -R 755 /var/www/$client

sudo touch /etc/apache2/sites-available/$client.conf

echo "Setup Virtual Host"
read -p "Enter admin's email: " adminemail
# Check email pattern [TODO]

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

echo "Enable apache client conf"
sudo a2ensite $client.conf
echo "Disable apache default conf"
sudo a2dissite 000-default.conf
echo "Apache config test :"
sudo apache2ctl configtest
echo "Restarting apache"
sudo systemctl restart apache2

# Download MySql
echo "Downloading mysql:8.16.1"
wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb
sudo dpkg -i mysql-apt-config*
echo "Installing mysql-server"
sudo apt install mysql-server

# Create mysql database
echo "Creating MySql Database"
read -p "Choose a database databasename : " databasename
read -s -p "Choose a database password : " dbpassword

# [TODO] confirme password
#read -s -p "Choose a database password : " dbpassword

sudo mysql -e"
DROP DATABASE IF EXISTS $databasename;
CREATE DATABASE $databasename DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL ON $databasename.* TO '$USER'@'localhost' IDENTIFIED BY '$dbpassword';
FLUSH PRIVILEGES;
"

# Installing Additional PHP Extensions
echo "Installing Additional PHP Extensions"
sudo apt install php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip

sudo a2enmod rewrite
echo "Test apache config"
sudo apache2ctl configtest
echo "Restarting apache"
sudo systemctl restart apache2


# WP-CLI
echo "Installing WordPress CLI"
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

echo "Creating WordPress project"
wp core download --locale=fr_FR --path=/var/www/$client/ --force

sudo cp /var/www/$client/wp-config-sample.php /var/www/$client/wp-config.php
sudo mkdir /var/www/$client/wp-content/upgrade


# Configuring the WordPress Directory
echo "Configuring the WordPress Directory"
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
printf '%s\n' "g/$STRING/d" a "$SALT" . w | ed -s /var/www/$client/wp-config.php

# If "your php version don't get mysql extension"
sudo apt-get install php7.0-mysql
sudo systemctl restart apache2

# [TODO] update php7.4