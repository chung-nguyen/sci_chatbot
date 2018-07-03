#/bin/bash

export REMOTE=root@165.227.50.29
export REMOTE_PATH=/home/sci_chatbot

ssh $REMOTE mkdir $REMOTE_PATH
ssh $REMOTE chown nobody:nobody $REMOTE_PATH
rsync -ar --progress . $REMOTE:$REMOTE_PATH

ssh $REMOTE pm2 start $REMOTE_PATH/pm2.json

#ssh $REMOTE cp $REMOTE_PATH/nginx_conf/* /etc/nginx/sites-enabled
#service nginx restart

echo $REMOTE_PATH
