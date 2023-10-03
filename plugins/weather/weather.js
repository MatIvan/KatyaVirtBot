const port = 11002;
const katyaServerUrl = 'http://localhost:8888/send';
const weatherServerUrl = 'http://localhost:8080/v1/text/now?location=Moscow';
const userToken = 'GUEST_TOKEN';
const checkDayUrl = 'http://isdayoff.ru/today';

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

setInterval(() => {
    const currentdate = new Date();
    if (currentdate.getHours() === 7 && currentdate.getMinutes() === 0) {
        fetch(checkDayUrl)
            .then(resp => resp.text())
            .then(text => {
                if (text === "0") {//work day
                    getCurrentWeather("COMMON")
                }
            })
            .catch(err => console.log("Can't get day info: ", err));
    };
}, 1000 * 60)

function onHook(request) {
    const { hook } = request;
    console.info('onHook ' + hook);
    getCurrentWeather(hook.condition.chatName);
}

function getCurrentWeather(chatName) {
    return fetch(weatherServerUrl)
        .then(resp => resp.text())
        .then(text => say(chatName, text))
        .catch(err => console.error(err));
}

function say(chatName, text) {
    console.info("say:" + chatName, text);
    const body = {
        chatName: chatName,
        message: text
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
