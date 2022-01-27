require('dotenv').config();
import { startBrowser } from './browser'

export async function authToProfile(email: string = null, password: string = null) {

    const browserInstance = await startBrowser();
    const page = await browserInstance.newPage();

    if (!page) throw new Error("Возникла проблема с созданием браузера");

    const authEmail = email ? email : process.env.def_mail
    const authPassword = email ? email : process.env.def_pass

    await page.goto('https://www.instagram.com');
    await page.setViewport({ width: 1000, height: 900 })
    await page.waitForSelector('input[name=username]');
    for (let i = 0; i < authEmail.length; i++) {
        await page.focus('input[name=username]');
        await page.keyboard.press(authEmail[i]);
    }
    for (let i = 0; i < authPassword.length; i++) {
        await page.focus('input[name=password]');
        await page.keyboard.press(authPassword[i]);
    }
    await page.click('button[type=submit]');
    await page.waitFor(2000);

    try {
        await page.waitForSelector('img[alt=Instagram]', {timeout: 10000});
    } catch (error) {
        const allerError = await page.waitForSelector('p[id=slfErrorAlert]', {timeout: 10000});
        if(allerError) {
            throw new Error("Ошибка авторизации");
        }else{
            throw new Error("Другая ошибка");
        }
    }
    return page
}