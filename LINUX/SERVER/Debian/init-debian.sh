#!/bin/bash

echo "Creation of new user"
read -p "Enter Your username: " USER_NAME

echo "Welcome $USER_NAME!"

adduser $USER_NAME
usermod -aG sudo $USER_NAME

mv test.sh /home/$USER_NAME/

cp -r ~/.ssh /home/$USER_NAME
chown -R $USER_NAME:$USER_NAME /home/$USER_NAME/.ssh

#Switch to the new user
echo "Switch to the new user"
su $USER_NAME