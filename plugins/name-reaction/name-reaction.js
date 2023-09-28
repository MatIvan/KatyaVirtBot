const port = 11001;
const katyaServerUrl = 'http://katya:11000/send';
const userToken = 'DEMOTOKEN';

const express = require('express');
const app = express();
app.use(express.json());
app.post("/", (req, resp) => {
    onHook(req.body);
    resp.end();
})

app.listen(port, function () {
    console.info('Server start on port ' + port);
});

function onHook(request) {
    const { hook, message } = request;
    const body = {
        chatName: hook.condition.chatName,
        message: 'Я Катя!'
    }
    return fetch(katyaServerUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        },
    });
}
