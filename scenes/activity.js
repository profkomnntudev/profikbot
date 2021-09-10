const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require('../helpers/database')
const phrase = require("../phrases.json")
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.getToken());

module.exports = new Scene('activity',
    async (ctx)=> {
        let activitys = db.getAllActivitys()
        console.log(activitys == [])
        if(activitys.length == 0){
            ctx.scene.leave()
            await ctx.reply("К сожалению, сейчас не проводится никаких мероприятий... \nНо если что-то появится, ты первый узнаешь об этом из группы!", null, Markup
            .keyboard([
                [
                    Markup.button(phrase.start.to_start, 'positive'),
                ]
            ]))
        }
        else{
            ctx.scene.next();
            let keyboard = [];
            for (let i = 0; i < activitys.length; i++) {
                let inner = []
                inner.push(Markup.button(activitys[i].name))
                keyboard.push(inner) 
            }
            await ctx.reply("Какое мероприятие тебя интересует?", null, Markup
            .keyboard(keyboard))
        }
        
},
    async (ctx)=>{
        ctx.scene.leave();
        let activity = db.getActivityByName(ctx.message.text);
        console.log(activity)
        if (activity != null){
            await ctx.reply(activity.desc, null, Markup
                .keyboard([
                    [
                        Markup.button(phrase.start.to_start)
                    ]
                ]))
        }
        else{
            await ctx.reply(phrase.idk[RandInt(0, phrase.idk.length-1)], null, Markup
                .keyboard([
                    [
                        Markup.button(phrase.start.to_start)
                    ]
                ]))
        }
    })