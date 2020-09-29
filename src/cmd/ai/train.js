const BaseCommand = require('../../util/BaseCommand');
module.exports = class InfoCommand extends BaseCommand {
  constructor() {
    super('train', 'ai', ['train', 't']);
  }

  async run(client, message, args) {
      const trainMessage = { 
          title: "Brainly v1.0.0",
          description: "Add reactions to compete and train the machine.",
          thumbnail: {
            url: client.user.avatarURL()
          },
          fields: [{
            name: "Score",
            value: "**AI**: \n **Player**: "
          },
              {
                  name: "AI's choice",
                  value: "*null*"
              }
          ]
      }
    const msg = await message.channel.send({embed: trainMessage});
    await msg.addTrainReaction(client)
    const filter = (r, u) => u.id === message.author.id && ["📄", "✂️", "⛰️"].includes(r.emoji.name) && r.message.id === msg.id;
    client.neural.initData()
    const collector = msg.createReactionCollector(filter, {time: 300000000});

    collector.on("collect", (r, u) => {
        r.users.remove(u.id)
        client.neural.joueurChoix = r.XORValue;
        client.neural.games++
        client.neural.train([client.neural.pattern], { iterations: 100, log: false })
        const futurJoueurChoix = client.neural.run(client.neural.pattern)
        client.neural.updateData()
        client.neural.aiChoix = 1 <= Math.round(futurJoueurChoix) && Math.round(futurJoueurChoix) <= 3 ? (Math.round(futurJoueurChoix) % 3) + 1 : 1
        client.neural.getWinner(msg);
    })
  }
}

