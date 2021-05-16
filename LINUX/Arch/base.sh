#!/bin/bash

# inspired by : EF - Linux Made Simple
# youtube channel : https://www.youtube.com/c/EFLinuxMadeSimple/featured
# https://gitlab.com/eflinux/arch-basic

ln -sf /usr/share/zoneinfo/Europe/Paris /etc/localtime
hwclock --systohc
sed -i 's/#fr_FR.UTF-8 UTF-8/fr_FR.UTF-8 UTF-8/' /etc/locale.gen
locale-gen
echo "LANG=fr_FR.UTF-8" >> /etc/locale.conf
echo "KEYMAP=fr" >> /etc/vconsole.conf

read -p "Choose a hostname : " HOSTNAME
echo $HOSTNAME >> /etc/hostname

echo "127.0.0.1 localhost" >> /etc/hosts
echo "::1       localhost" >> /etc/hosts
echo "127.0.1.1 $HOSTNAME.localdomain $HOSTNAME" >> /etc/hosts
echo root:password | chpasswd

pacman -S --noconfirm grub efibootmgr networkmanager network-manager-applet dialog wpa_supplicant mtools dosfstools reflector base-devel linux-headers avahi xdg-user-dirs xdg-utils gvfs gvfs-smb nfs-utils inetutils dnsutils bluez bluez-utils cups hplip alsa-utils pulseaudio bash-completion openssh rsync reflector acpi acpi_call tlp virt-manager qemu qemu-arch-extra ovmf bridge-utils dnsmasq vde2 openbsd-netcat ebtables iptables ipset firewalld flatpak sof-firmware nss-mdns acpid nodejs htop vim

grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg

systemctl enable NetworkManager
systemctl enable bluetooth
systemctl enable cups
systemctl enable sshd
systemctl enable avahi-daemon
systemctl enable tlp
systemctl enable reflector.timer
systemctl enable fstrim.timer
systemctl enable libvirtd
systemctl enable firewalld
systemctl enable acpid

read -p "Choose a username : " USER_NAME
useradd -m $USER_NAME
echo $USER_NAME:password | chpasswd
usermod -aG libvirt $USER_NAME

echo "timarch ALL=(ALL) ALL" >> /etc/sudoers.d/timarch


/bin/echo -e "\e[1;32mDone! Type exit, umount -a and reboot.\e[0m"



