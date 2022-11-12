const { Command } = require('../../utils')

module.exports = class blList extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'bllist'
    this.aliases = ['bllist', 'blacklist-list']
    this.category = 'Magic'
    this.adminOnly = true
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const userDoc = await this.client.database.user.model.find({ 'blacklist': true })
    const msg = [];

    for (let i = 0; i < userDoc.length; i++) {
      const user = await this.client.users.fetch(userDoc[i]._id)
      msg.push(`${user.tag} - ${user.id}`)
    }

    await message.reply(`<:a_blurplecertifiedmoderator:856174396225355776> Lista de membros na blacklist:\n${msg.join('\n')}`)
  }
}