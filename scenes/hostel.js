const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require('../helpers/database')
const phrase = require("../phrases.json")
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.getToken());

module.exports = new Scene('hostel', 
    async (ctx)=>{
      console.log(ctx)
        ctx.scene.next();
        await ctx.reply(phrase.ans.obsh, null, Markup
            .keyboard([
              [
                Markup.button(phrase.obsh.dush, 'positive'),
                Markup.button(phrase.obsh.raspis, 'positive'),
              ],
              [
                Markup.button(phrase.obsh.room, 'positive'),
                Markup.button(phrase.obsh.zasel, 'positive'),
              ],
              [
                Markup.button('Иной вопрос', 'positive')
              ],
              [
                Markup.button(phrase.start.to_start, 'positive'),
              ]
            ])
            .oneTime(true))
    },
    async (ctx)=>{
      console.log(ctx)
        switch(ctx.message.text){
            case phrase.obsh.zasel:{
                await ctx.reply(phrase.obshansw.zasel, null, Markup
                    .keyboard([
                      [
                        Markup.button('Я абитуриент', 'positive'),
                      ],
                      [
                        Markup.button('Я уже студент', 'positive'),
                      ],
                    ])
                    .oneTime(true))
                ctx.scene.next();
                ctx.session.q='zasel';
                break;
            }
            case phrase.obsh.dush:{
                await ctx.reply(phrase.obshansw.dush, null, Markup
                    .keyboard([
                      [
                        Markup.button(phrase.start.anotherq, 'positive'),
                      ],
                      [
                        Markup.button(phrase.hellomk.obsh[1], 'positive'),
                      ],
                    ])
                    .oneTime(true))
                ctx.scene.leave();
                break;
            }
            case phrase.obsh.raspis:{
                await ctx.reply(phrase.obshansw.raspis, null, Markup
                    .keyboard([
                      [
                        Markup.button(phrase.start.anotherq, 'positive'),
                      ],
                      [
                        Markup.button(phrase.hellomk.obsh[1], 'positive'),
                      ],
                    ])
                    .oneTime(true))
                ctx.scene.leave();
                break;
            }
            case phrase.obsh.room:{
                await ctx.reply(phrase.obshansw.room+db.getLeader('zhbk').name+' vk.com/id'+db.getLeader('zhbk').id, null, Markup
                    .keyboard([
                      [
                        Markup.button(phrase.start.anotherq, 'positive'),
                      ],
                      [
                        Markup.button(phrase.hellomk.obsh[1], 'positive'),
                      ],
                    ])
                    .oneTime(true))
                ctx.scene.leave();
                break;
            }
            case 'Иной вопрос':{
                await ctx.reply('Напишите свой вопрос', 'photo502246455_457256545')
                ctx.session.q = 'anq';
                ctx.scene.next();
                break;
            }
            default:
                {
                    ctx.scene.leave();
                    break;
                }
        }
    },
    async (ctx)=>{
      console.log(ctx)
      switch(ctx.session.q){
        case 'anq':{
          leader = db.getLeader('zhbk')
          await ctx.reply('Для решения этого вопроса с тобой свяжется '+leader.place+' [id'+leader.id+'|'+ leader.name+']', null, Markup
        .keyboard([
          [
            Markup.button(phrase.start.anotherq, 'positive'),
          ],
          [
            Markup.button(phrase.hellomk.obsh[1], 'positive'),
          ],
        ])
        .oneTime(true)).then(()=>{
            bot.sendMessage(db.getLeader('zhbk').id, 'Вопрос: '+ctx.message.text+'\nЗадает vk.com/id'+ctx.message.from_id)
        })
        ctx.scene.leave();
        break;
        }
        case 'zasel':{
          switch(ctx.message.text){
            case 'Я абитуриент':{
              await ctx.reply(phrase.obshansw.zasel_new, null, Markup
                .keyboard([
                  [
                    Markup.button(phrase.start.anotherq, 'positive'),
                  ],
                  [
                    Markup.button(phrase.hellomk.tonntu[1])
                  ],
                  [
                    Markup.button(phrase.hellomk.obsh[1], 'positive'),
                  ],
                ])
                .oneTime(true))
                ctx.scene.leave();
                break;
            }
            case 'Я уже студент':{
              await ctx.reply(phrase.obshansw.zasel_old, null, Markup
                .keyboard([
                  [
                    Markup.button(phrase.start.anotherq, 'positive'),
                  ]
                ])
                .oneTime(true))
                ctx.scene.leave(); 
                break;
            }
          }
        }
      }

    })