# Katya Virt
Telegram bot for my friends.

# Config
See config files in folder "./config"

# WebHooks REST API
Server on port by properties. Send http requests to uri "/webhook". Require authorisation by header "Authorization: Token <token>".
* GET "/webhook" - get all webhooks info
* POST "/webhook" - add new webhook and return ID
* GET "/webhook/:id" - get all information about webhook by id.

## Example
```bash
curl -v "http://localhost:8888/webhook" -H "Authorization: Token DEMOTOKEN"
```

```bash
curl -X POST "http://localhost:8888/webhook" \
    -H "Authorization: Token DEVTOKEN" \
    -H "Content-Type: application/json" \
    -d '{
         "url":"http://demourl", 
         "isPutToQueue": false
         "condition":{
             "chat":"COMMON", 
             "contains":["OPA2"], 
             "startWith":["OPA2"], 
             "caseSensitive":true}
        }'
```

```bash
> curl "http://localhost:8888/webhook/1" \
    -H "Authorization: Token DEVTOKEN"
```

# Sending as Katya
To send message as Katya make POST request:
* POST "/send" - send text to chat.

## Example
```bash
curl -X POST "http://localhost:8888/send" \
    -H "Authorization: Token DEVTOKEN" \
    -H "Content-Type: application/json" \
    -d '{
         "message":"hello world", 
         "chatName":"COMMON"
        }'
```

# Get messages from queue
To get saved messages from server, make GET request:
* GET "/get" - get messages

## Example
```bash
curl "http://localhost:8888/get" -H "Authorization: Token DEVTOKEN"
```

# Plugin
By web hooks you may write plugins for Katya. See exmample in "plugins" folder.
