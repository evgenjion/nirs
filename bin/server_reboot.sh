ssh ubuntu@in-cloud.mipt.ru -p 54110 -i ~/.ssh/NIRS-KEY.pem "sudo sh ~/nirs/bin/kill_server_process.sh; sudo node --harmony nirs/app.js"
