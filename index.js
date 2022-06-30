const secrets = require('./secrets.js') 
const { Telegraf } = require('telegraf')
const fs = require('fs')

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

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.on('voice', ctx => ctx.reply('ecris lawax'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears('video', ctx => ctx.replyWithVideo({source: 'video.mp4'}))

//commands
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('hipster', ctx => {
    inlineReply(ctx, "I'm not a hipster!")
})

//launching bot
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
