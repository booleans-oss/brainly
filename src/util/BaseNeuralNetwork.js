const { recurrent } = require('brain.js');
module.exports = class NeuralNetworkBase extends recurrent.LSTMTimeStep {
    constructor(options) {
        super(options)
        this.pattern = []
      this.scoreJoueur = 0,
      this.scoreAI = 0,
      this.joueurChoix = 0,
      this.aiChoix = 0,
      this.status = '',
      this.games = 0,
      this.patternLentgh = 10
    }

    initData() {
        if (this.pattern.length < 1) {
            for (let index = 1; index <= this.patternLentgh; index++) {
              this.pattern.push(Math.floor(Math.random() * 3) + 1)
            }
          }
    }

    updateData() {
        if (this.games !== 0) {
            this.pattern.shift()
            this.pattern.push(this.joueurChoix)
          }
    }
    getStringValue(XOR) {
        const data = {
            1: "⛰️",
            2: "📄",
            3: "✂️"
        }
        return data[XOR]
    }
    getWinner(msg) {
            if (this.joueurChoix === this.aiChoix) {
              this.winner = 'Tie ❓'
            } else if (
              (this.joueurChoix === 1 && this.aiChoix === 3) ||
              (this.joueurChoix === 3 && this.aiChoix === 2) ||
              (this.joueurChoix === 2 && this.aiChoix === 1)
            ) {
              this.status = 'You won 🏆'
              this.scoreJoueur++
            } else {
              this.status = 'You lost 💀'
              this.scoreAI++
            }
            const trainMessage = { 
                title: "Brainly v1.0.0",
                description: "Add reactions to compete and train the machine.",
                fields: [{
                  name: this.status,
                  value: `**AI**: ${this.scoreAI} \n **Player**: ${this.scoreJoueur}`
                },
                    {
                        name: "AI's Choice",
                        value: `*${this.getStringValue(this.aiChoix)}*`
                    },
                    {
                        name: "Number of games",
                        value: this.games
                    }
                ]
            }
            msg.edit({embed: trainMessage})
    }
}
