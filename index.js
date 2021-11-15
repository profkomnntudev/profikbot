const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require('./helpers/database')
const fs = require("fs");
const phrase = require("./phrases.json")
const active = require("./scenes/active")
const hostel = require("./scenes/hostel")
const qai = require("./scenes/qai")
const partnership = require('./scenes/partnership')
const admin = require("./scenes/admin")
const anq = require("./scenes/anq")
const step = require("./scenes/step")
const activitys = require("./scenes/activity")
const apiVK = require('node-vk-bot-api/lib/api')
RandInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

const bot = new VkBot(db.getToken());

const inAction = (from_id) => {
  if (db.getAction(from_id)){
    return true
  }
  return false
}
 
bot.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
  }
});

const mainMarkup = [
  [
    Markup.button( phrase.hellomk.matpom, 'primary'),
    Markup.button( phrase.hellomk.obsh[0], 'primary'),
    Markup.button( phrase.hellomk.money, 'primary'),
  ],
  [
    Markup.button( phrase.hellomk.inst, 'primary'),
    Markup.button( phrase.hellomk.tonntu[0], 'primary'),
  ],
  [
    Markup.button( phrase.hellomk.exchangeintonntu, 'primary'),
    Markup.button( phrase.hellomk.exchangeonnntu, 'primary'),
  ],
  [
    Markup.button( phrase.hellomk.active, 'positive'),
  ],
  [
    Markup.button( phrase.hellomk.iwanttoprof, 'positive'),
    Markup.button( phrase.hellomk.uvol, 'positive'),
    Markup.button( phrase.hellomk.anq, 'positive'),
  ],
  [
    Markup.button(phrase.hellomk.partnership),
  ]
]

bot.command(['Начать', 'Привет', 'Добрый день', phrase.start.to_start, phrase.start.anotherq, 'Start'], async (ctx) => {
  db.deleteAction(ctx.message.from_id);
  console.log(ctx.message.text);
  let text = phrase.hello[RandInt(0, phrase.hello.length-1)];
  let img = 'photo620633475_457239019';
  if (ctx.message.text === phrase.start.to_start || ctx.message.text === phrase.start.anotherq){
    text = 'Чем я еще могу тебе помочь?';
    img = null;
  }
  await ctx.reply(text, img, Markup
  .keyboard(mainMarkup)
  .oneTime(true));
  });

bot.command(phrase.hellomk.money, async (ctx) => {
  db.setAction(ctx.message.from_id);
      await ctx.reply(phrase.ans.obsh, null, Markup
      .keyboard([
        [
          Markup.button(phrase.money.when, 'positive'),
        ],
        [
          Markup.button(phrase.money.wait, 'positive'),
        ],
        [
          Markup.button(phrase.money.how_much, 'positive'),
        ]
      ])
      .oneTime(true))
    })

bot.command(['спасибо','Благодарю'], async (ctx) => {
      await ctx.reply(phrase.thx[RandInt(0, phrase.thx.length-1)], null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true))
    })

bot.command('пока', async (ctx) => {
      await ctx.reply(phrase.bye[RandInt(0, phrase.bye.length-1)], null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true))
    })

bot.command(phrase.money.when, async (ctx) => {
  db.setAction(ctx.message.from_id);
      await ctx.reply(phrase.moneyansw.when, null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true))
    })
    
bot.command(phrase.hellomk.uvol, async (ctx) => {
  db.setAction(ctx.message.from_id);
      await ctx.reply(phrase.ans.uvol, null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true))
    })  

bot.command(phrase.money.wait, async (ctx) => {
  db.setAction(ctx.message.from_id);
  let ms = Date.now();
  let date = new Date(ms);
  let text = "";
  if (date.getDate() < 25){
    text = phrase.moneyansw.wait
  } else{
    if (date.getDate() == 25){
      text = phrase.moneyansw.wait25
    } else{
      text = phrase.moneyansw.wait_after
    }
  }
      await ctx.reply(text, null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true))
    })
    
    bot.command(phrase.money.how_much, async (ctx) => {
      db.setAction(ctx.message.from_id);
      leader = db.getLeader('kok');
      await ctx.reply(phrase.moneyansw.how_much+leader.place+' [id'+leader.id+'|'+ leader.name+']'+phrase.moneyansw.how_much2, null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true)).then(()=>{
        bot.sendMessage(db.getLeader('kok').id, 'vk.com/id'+ctx.message.from_id+' Вопрос по размеру стипендии')
      })
    })   


bot.command(phrase.hellomk.matpom, async (ctx) => {
  db.setAction(ctx.message.from_id);
  await ctx.reply(phrase.ans.matpom, phrase.ans.matpom_wall, Markup
  .keyboard([
    [
      Markup.button(phrase.start.anotherq, 'positive'),
    ]
  ])
  .oneTime(true))
})

bot.command(phrase.hellomk.iwanttoprof, async (ctx) => {
  db.setAction(ctx.message.from_id);
  await ctx.reply(phrase.ans.iwanttoprof, null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.anotherq, 'positive'),
    ]
  ])
  .oneTime(true))
})

bot.command(phrase.hellomk.tonntu, async (ctx) => {
  db.setAction(ctx.message.from_id);
  await ctx.reply(phrase.ans.tonntu, null, Markup
    .keyboard([
      [
        Markup.button(phrase.start.anotherq, 'positive'),
      ]
    ])
    .oneTime(true))
  })

bot.command(phrase.hellomk.exchangeonnntu, async (ctx) => {
  db.setAction(ctx.message.from_id);
  await ctx.reply(phrase.ans.exchangeonnntu, null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.anotherq, 'positive'),
    ]
  ])
  .oneTime(true))
})

bot.command(phrase.hellomk.exchangeintonntu , async (ctx) => {
  db.setAction(ctx.message.from_id);
  await ctx.reply(phrase.ans.exchangeintonntu, null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.anotherq, 'positive'),
    ]
  ])
  .oneTime(true))
})

const session = new Session();

const stage = new Stage(active, qai, partnership, hostel, admin, step, activitys, anq);

bot.use(session.middleware());
bot.use(stage.middleware());

bot.command(phrase.hellomk.active, async (ctx) => {
  db.setAction(ctx.message.from_id);
  await ctx.scene.enter('active');
});

bot.command(phrase.hellomk.inst, async (ctx) => {
  db.setAction(ctx.message.from_id);
  await ctx.scene.enter('qai');
})

bot.command(phrase.hellomk.anq, async (ctx) => {
  db.setAction(ctx.message.from_id);
  await ctx.scene.enter('anq');
})

bot.command(phrase.hellomk.partnership, async (ctx)=>{
  db.setAction(ctx.message.from_id);
  await ctx.scene.enter('partnership')
})

bot.command(phrase.hellomk.obsh[0], async (ctx)=>{
  db.setAction(ctx.message.from_id);
  await ctx.scene.enter('hostel')
})

bot.command(phrase.admin.start, async (ctx)=>{
  await ctx.scene.enter('admin');
})

bot.command(phrase.code, async (ctx)=>{
  const res = await apiVK('groups.isMember', 
  {
    access_token: db.getToken(),
    group_id: 27489655,
    user_id: ctx.message.from_id
  });
  if (res.response === 1){
    ctx.reply("Щшхтьоя хэбво лыоя Ц10")
  } else {
    ctx.reply("Для доступа к этому заданию необходимо подписаться на группу профсоюзной организации студентов НГТУ")
  }
})

bot.on(async (ctx)=>{
  let msgtxt = ctx.message.text;
  let att = ctx.message.attachments;
  if (att != undefined){
    let story = false
    for(let i = 0; i < att.length; i++){
      if (att[i].type == 'story'){
        story = true;
      }
    }
    if (story){
    text = phrase.story[RandInt(0, phrase.story.length-1)]
  }
  }
  let partner = msgtxt.indexOf('https://vk.com/wall') != -1 || msgtxt.indexOf('w=wall') != -1 || msgtxt.indexOf('разместить') != -1 || msgtxt.indexOf('опубликовать') != -1 || msgtxt.indexOf('пост') != -1 || msgtxt.indexOf('репост') != -1 || msgtxt.indexOf('конкурс') != -1 || msgtxt.indexOf('разместить') != -1;
  if (partner){
    text = 'Здравствуйте! Я передам ваше предложение!'
  }
  if (att || partner){
    await ctx.reply(text, null, Markup
  .keyboard(mainMarkup)
  .oneTime(true)).then(
    partner && bot.sendMessage(db.getLeader('iao').id, 'vk.com/id'+ctx.message.from_id+' Чекни сообщения группы, тут сотрудничество предлагают')
  );
  }
});
  

bot.startPolling((err) => {
    if (err) {
      console.error(err);
    }
  });