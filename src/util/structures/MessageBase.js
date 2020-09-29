const { Structures, Message } = require('discord.js');

Structures.extend('Message', (Message) => {
  class TrainMessage extends Message {
    constructor(client, message, channel) {
      super(client, message, channel);
      this.message = message;
      this.channel = channel;
    }
    async addTrainReaction(client) {
       let data = new Message(client, this.message, this.channel);
        await data.react("⛰️")
        await data.react("📄")
        await data.react("✂️")
    }
  }

  return TrainMessage;
});