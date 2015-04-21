#!/usr/bin/env bash

ssh ubuntu@in-cloud.mipt.ru -p 54110 -i ~/.ssh/NIRS-KEY.pem "cd ~/nirs/; git fetch --all; git rebase origin/master; node node_modules/.bin/gulp production;"

source "bin/server_reboot.sh"
