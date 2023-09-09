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
> curl -v "http://localhost:8888/webhook" -H "Authorization: Token DEMOTOKEN"
> curl -X POST "http://localhost:8888/webhook" -H "Authorization: Token DEVTOKEN" -H "Content-Type: application/json" -d '{"url":"http://demourl", "condition":{"chat":"COMMON", "contains":["OPA2"], "startWith":"OPA2", "caseSensitive":true}}'
> curl "http://localhost:8888/webhook/1" -H "Authorization: Token DEVTOKEN"
