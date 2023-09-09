//@ts-check
const props = require('./props');
console.log("Start.");
console.log("props: ", {
    ...props,
    token: "<secret>"
});

const server = require('./server/server');
server.start();

const katya = require('./katya/katya');
katya.start();
