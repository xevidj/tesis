#!/bin/sh
sudo apt-get update -y
echo 'System Updated'
sudo apt-get install vim -y
echo 'Vim Installed'
sudo apt-get install git -y
echo 'Git Installed'
sudo sh get-docker.sh
echo 'Docker and Docker-compose Installed'