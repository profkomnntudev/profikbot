const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const phrase = require("../phrases.json")
const db = require('../helpers/database')
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.getToken());

module.exports = new Scene('partnership',
async (ctx)=>{
  ctx.scene.next();
  await ctx.reply('Напишите ваше предложение: ')
}, 
  async (ctx )=>{
  await ctx.reply('Ваше предложение будет рассмотрено в ближайшее время!', null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.to_start)
    ]
  ])).then(
    bot.sendMessage(db.getLeader('iao').id, 'vk.com/id'+ctx.message.from_id+' Чекни сообщения группы, тут сотрудничество предлагают')
  )
  ctx.scene.leave()
})