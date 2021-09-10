const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const phrase = require("../phrases.json")
const db = require('../helpers/database')
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.getToken());

module.exports = new Scene('anq',
async (ctx)=>{
  ctx.scene.next();
  await ctx.reply('Напиши свой вопрос: ')
}, 
  async (ctx )=>{
  await ctx.reply('Я передал вопрос, тебе обязательно ответят в ближайшее время!', null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.to_start)
    ]
  ])).then(
    bot.sendMessage(db.getLeader('iao').id, 'vk.com/id'+ctx.message.from_id+' ' + ctx.message.text + '\nОтветь в сообщениях группы')
  )
  ctx.scene.leave()
})