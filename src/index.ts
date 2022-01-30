import 'dotenv/config'
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Telegraf } from 'telegraf'
import { checkUser, updateUserActions } from './services/UserService';
import { getMainMenu, getBackBtn, setMailAndPass, getMainMenuInline, MenuActions } from './keyboards/keyboards'
import { authToProfile } from './instagram/auth';
import { goToProfile } from './instagram/parser';
import { logger } from './services/Loger';
import { CheckUserResultInterface } from './interface/check-user.inreface';
import { getListFollowers } from './instagram/get_list_followers';

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN)
let CURRENT_PAGE
let NICK: string

console.log(process.env.PORT)

createConnection()
    .then(async connection => logger.info(`DATABASE was started`))
    .catch(error => console.log('err', error));


bot.start(async ctx => {
    logger.debug(`Start command received from: id - ${ctx.message.from.id}, login - ${ctx.from.username}, name - ${ctx.from.first_name}`)

    const checkUserResult: CheckUserResultInterface = await checkUser(ctx)

    if (checkUserResult.creating) {
        ctx.replyWithHTML(`Hello, <b>${ctx.from.first_name}</b>!! \nYou can start testing the bot.`, getMainMenuInline())
    } else {
        ctx.replyWithHTML(`Welcome, <b>${ctx.from.first_name}</b>!! \nYou can start testing the bot.`, getMainMenuInline())
    }
})

bot.hears('To start', ctx => {
    ctx.reply('9️⃣1️⃣1️⃣', getMainMenuInline())
})

bot.command('nick', async ctx => {
    ctx.reply('Ok, pls wait')
    NICK = ctx.message.text.slice(6).trim()
    await updateUserActions(ctx)
    logger.warn(`The user id - ${ctx.message.from.id}, login - ${ctx.from.username} sent request with name - ${NICK}`)
    try {
        CURRENT_PAGE = await authToProfile()
        CURRENT_PAGE = await goToProfile(CURRENT_PAGE, NICK)
        logger.debug(`Authorization was successful and Profile is true`);
        ctx.reply(`Authorization was successful and ${NICK} exists`, MenuActions())
    } catch (error) {
        logger.warn('Authorization failed', error)
        ctx.reply(`${error}`)
    }

})







bot.action('use_default_profile', ctx => {
    ctx.answerCbQuery('Ok bitch!!')
    ctx.reply(
        `Enter a nickname with comand, exaple:
        /nick exaplenick`, getBackBtn())
})
bot.action('authorize_account', ctx => {
    ctx.answerCbQuery('Sorry, it will be.')
    ctx.reply('1', getBackBtn())
})

bot.action('get_list_followers', async ctx => {
    ctx.answerCbQuery('Bot is finding data. Pls wait.⏳')

    await getListFollowers(CURRENT_PAGE, NICK)

    // ctx.reply('Finish ⌛️', getBackBtn())
})


bot.action('get_list_following', async ctx => {
    ctx.answerCbQuery('Sorry, it will be.')
    ctx.reply('1', getBackBtn())
})


bot.action('get_last_post', async ctx => {
    ctx.answerCbQuery('Sorry, it will be.')
    ctx.reply('1', getBackBtn())
})


bot.action('get_list_posts', async ctx => {
    ctx.answerCbQuery('Sorry, it will be.')
    ctx.reply('1', getBackBtn())
})


bot.launch()

app.listen(process.env.PORT, () => {
    logger.info(`My server is running on port: ${process.env.PORT}`)
})



