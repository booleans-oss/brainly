const { Structures } = require('discord.js');

Structures.extend('MessageReaction', (Reaction) => {
  class TrainReaction extends Reaction {
    constructor(client, reaction, message) {
      super(client, reaction, message);
      this.reaction = reaction;
    }
    get XORValue() {
            const data = {
                "⛰️": 1,
                "📄": 2,
                "✂️": 3
            }
            return data[this.reaction.emoji.name]
    }
  }

  return TrainReaction;
});