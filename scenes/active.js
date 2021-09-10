const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require('../helpers/database')
const phrase = require("../phrases.json")
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.getToken());

module.exports = new Scene('active',
  async (ctx) => {
     ctx.scene.next();
   await ctx.reply('Отлично! Что ты умеешь или в чем хочешь развиватся?', null, Markup
    .keyboard([
      [
        Markup.button('Снимать видосы', 'primary'),
        Markup.button('Писать музыку', 'primary'),
        Markup.button('Делать посты', 'primary'),
      ],
      [
        Markup.button('Дизайнить', 'primary'),
        Markup.button('Фотографировать', 'primary'),
      ],
      [
        Markup.button('Устраивать крутейшие мероприятия', 'primary'),
        Markup.button('Помогать общажникам', 'primary'),
      ],
      [
        Markup.button('Контроллировать крутотень обучения', 'primary')
      ],
      [
        Markup.button('Помогать своему институту', 'primary')
      ]
    ])
    .oneTime(true));
  },
  async (ctx) => {
    if (ctx.message.text === 'Помогать своему институту'){
       ctx.scene.next();
     await ctx.reply('С какого ты института?', null, Markup
      .keyboard([
        [
          Markup.button('ИТС', 'primary'),
          Markup.button('ИЯЭиТФ', 'primary'),
        ],
        [
          Markup.button('ИПТМ', 'primary'),
          Markup.button('ИРИТ', 'primary'),
        ],
        [
          Markup.button('ИНЭУ', 'primary'),
          Markup.button('ИНЭЛ', 'primary'),
        ],
        [
          Markup.button('ИФХТиМ', 'primary'),
        ],
        [
          Markup.button(phrase.start.to_start)
        ],
      ])
      .oneTime(true));
    } else{
       ctx.scene.next();
      switch (ctx.message.text){
        case 'Снимать видосы':
        case 'Писать музыку': 
        case 'Делать посты': 
        case 'Дизайнить': 
        case 'Фотографировать':
          {
        leader = db.getLeader('iao')
         await ctx.reply('Отлично! С тобой свяжется '+leader.place+' [id'+leader.id+'|'+ leader.name+']', null,  Markup
          .keyboard([
            [
              Markup.button(phrase.start.anotherq),
            ]
          ])).then(()=>{
            bot.sendMessage(db.getLeader('iao').id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
          })
          
          ctx.scene.leave();
          break;
          }
        case 'Устраивать крутейшие мероприятия':
          {
          leader = db.getLeader('kms')
            await ctx.reply('Отлично! С тобой свяжется '+leader.place+' [id'+leader.id+'|'+ leader.name+']', null, Markup
            .keyboard([
              [
                Markup.button(phrase.start.anotherq),
              ]
            ])).then(()=>{
              bot.sendMessage(db.getLeader('kms').id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
            });
            ctx.scene.leave();
            break;
          }
        case 'Контроллировать крутотень обучения':
        {
          leader = db.getLeader('kok')
          await ctx.reply('Отлично! С тобой свяжется '+leader.place+' [id'+leader.id+'|'+ leader.name+']', null, Markup
          .keyboard([
            [
              Markup.button(phrase.start.anotherq),
            ]
          ])).then(()=>{
            bot.sendMessage(db.getLeader('kok').id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
          });
          ctx.scene.leave();
          break;

        }
        case 'Помогать общажникам':
          {
            leader = db.getLeader('zhbk')
            await ctx.reply('Отлично! С тобой свяжется '+leader.place+' [id'+leader.id+'|'+ leader.name+']', null, Markup
            .keyboard([
              [
                Markup.button(phrase.start.anotherq),
              ]
            ])).then(()=>{
              bot.sendMessage(db.getLeader('zhbk').id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
            });
            ctx.scene.leave();
            break;
          }
        default:
          await ctx.reply('Не понимаю тебя, вернись в начало и попробуй еще раз', null, Markup
          .keyboard([
            [
              Markup.button(phrase.start.anotherq),
            ]
          ]));
          ctx.scene.leave();
          break;
      }
    }
  },
  async (ctx) => {
    let leader;
    console.log(ctx.message.text)
    switch (ctx.message.text){
      case 'ИРИТ':
        {
          leader = db.getLeader('irit');
          break;
        }
      case 'ИТС':
        {
          leader = db.getLeader('its');
          break;
        }
      case 'ИНЭЛ':
        {
          leader = db.getLeader('inel');
          break;
        }
      case 'ИНЭУ':
        {
          leader = db.getLeader('ineu');
          break;
        }
      case 'ИФХТиМ':
        {
          leader = db.getLeader('ifhtim');
          break;
        }
      case 'ИЯЭиТФ':
        {
          leader = db.getLeader('iyaeitf');
          break;
        }
      case 'ИПТМ':
        {
          leader = db.getLeader('iptm');
          break;
        }
    }
   await ctx.reply('Отлично! С тобой свяжется '+leader.place+' [id'+leader.id+'|'+ leader.name+']', null, Markup
   .keyboard([
     [
       Markup.button(phrase.start.anotherq),
     ]
   ])).then(()=>{
      bot.sendMessage(leader.id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Хочет работать в профбюро');
    })
     ctx.scene.leave();
  });