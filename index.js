const secrets = require('./secrets.js') 
const { Telegraf } = require('telegraf')
require('fs')

const bot = new Telegraf(`${secrets.token}`, {
  telegram: {
    apiRoot: 'http://127.0.0.1:8081'
  }
})

const inlineReply = (ctx, answer) => {
    ctx.telegram.sendMessage(
        ctx.message.chat.id,
        `${answer}`, 
        {reply_to_message_id: ctx.message.message_id})
}

bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.start((ctx) => ctx.reply('Welcome'))
bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.on('new_chat_members', ctx => ctx.reply('Hello the new one'))
bot.on('voice', ctx => ctx.reply('ecris lawax'))
bot.on('sticker', ctx => ctx.reply('👍'))

//commands
bot.command('video', ctx => ctx.replyWithVideo({source: 'video.mp4'}))
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('hipster', ctx => {
    inlineReply(ctx, "I'm not a hipster!")
})

//launching bot
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
