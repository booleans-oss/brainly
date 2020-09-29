require('dotenv').config()
const Brainly = require("./util/structures/BotBase");
const ai = new Brainly({ partials: ['MESSAGE', 'REACTION']});

( async () => {
    await ai._start()
})()
