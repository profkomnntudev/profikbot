const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');

module.exports = new Scene('steps', 
(ctx)=>{
    ctx.reply('[step 0] Select step: ');
    ctx.scene.selectStep(ctx.message.text);
},
(ctx)=>{
    ctx.reply('[step 1] Select step: ');
    ctx.scene.selectStep(ctx.message.text);
},
(ctx)=>{
    ctx.reply('[step 2] Select step: ');
    ctx.scene.selectStep(ctx.message.text);
},
(ctx)=>{
    ctx.reply('[step 3] Select step: ');
    ctx.scene.selectStep(ctx.message.text);
},
(ctx)=>{
    ctx.reply('[step 4] Select step: ');
    ctx.scene.selectStep(ctx.message.text);
}
)