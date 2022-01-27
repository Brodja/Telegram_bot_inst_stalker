import 'dotenv/config'
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Telegraf } from 'telegraf'
import { checkUser, updateUserActions } from './services/UserService';
import { getMainMenu, getBackBtn, setMailAndPass } from './keyboards/keyboards'
import { authToProfile } from './instagram/auth';
import { goToProfile } from './instagram/parser';
import { logger } from './services/Loger';
import { CheckUserResultInterface } from './interface/check-user.inreface';

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN)

console.log(process.env.PORT)

createConnection()
    .then(async connection => logger.info(`DATABASE was started`))
    .catch(error => console.log('err', error));


bot.start(async ctx => {
    logger.debug(`Start command received from: id - ${ctx.message.from.id}, login - ${ctx.from.username}, name - ${ctx.from.first_name}`)

    const checkUserResult: CheckUserResultInterface = await checkUser(ctx)

    if(checkUserResult.creating){
        ctx.replyWithHTML(`Hello, <b>${ctx.from.first_name}</b>!! \nYou can start testing the bot.`, getMainMenu())
    } else {
        ctx.replyWithHTML(`Welcome, <b>${ctx.from.first_name}</b>!! \nYou can start testing the bot.`, getMainMenu())
    }
})

bot.hears('Use default profile', ctx => {
    logger.debug(`Touched to use default profile`);
    ctx.reply(
        `Enter a nickname with comand, exaple:
        /d_nick exaplenick`, getBackBtn())
})

bot.command('d_nick', async ctx => {
    ctx.reply('Nick successfully processed. Expect result')
    const nick: string = ctx.message.text.slice(8).trim()
    await updateUserActions(ctx)
    
    logger.warn(`Tge user id - ${ctx.message.from.id}, login - ${ctx.from.username} sent request with name - ${nick}`)

    try {
        const page = await authToProfile()
        ctx.reply('Authorization was successful')
        await goToProfile(page, nick)
    } catch (error) {
        logger.warn('Authorization failed', error)
        ctx.reply(`${error}`)
    }

    logger.debug(`Success result sended`);
})





bot.hears('Back', ctx => {
    ctx.reply('Go back', getMainMenu())
})

bot.launch()

app.listen(process.env.PORT, () => {
    logger.info(`My server is running on port: ${process.env.PORT}`)
})



