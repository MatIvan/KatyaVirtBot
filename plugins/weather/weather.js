console.log("Weather plugin starting...");
const PROPS = require('./properties.json');
console.log(PROPS);

const express = require('express');
const app = express();
app.use(express.json());
app.post("/", (req, resp) => {
    onHook(req.body);
    resp.end();
})

app.listen(PROPS.port, function () {
    console.info('Server start on port ' + PROPS.port);
});

setInterval(() => {
    const currentdate = new Date();
    if (currentdate.getHours() === 7 && currentdate.getMinutes() === 0) {
        console.log("Alarm: " + currentdate);
        fetch(PROPS.checkDayUrl)
            .then(resp => resp.text())
            .then(text => {
                console.log("Day type: " + (text === "0" ? "work" : "non-work"));
                if (text === "0") {//work day
                    getCurrentWeather("COMMON")
                }
            })
            .catch(err => console.log("Can't get day info: ", err));
    };
}, 1000 * 60)

function onHook(request) {
    const { hook } = request;
    console.info('onHook ', hook);
    getCurrentWeather(hook.condition.chatName);
}

function getCurrentWeather(chatName) {
    return fetch(PROPS.weatherServerUrl)
        .then(resp => resp.text())
        .then(text => say(chatName, '*Доброе утро!* \n' + text))
        .catch(err => console.error(err));
}

function say(chatName, text) {
    console.info("say:" + chatName, text);
    const body = {
        chatName: chatName,
        message: text,
        type: 'MARKDOWN'
    }
    return fetch(PROPS.katyaServerUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + PROPS.userToken
        },
    });
}
