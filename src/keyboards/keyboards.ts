import { Markup } from 'telegraf'

export function getMainMenu() {
    return Markup.keyboard([
        ['Сделать скан закрытого профиля'],
        ['Use default profile'],
        // ['Get statistic'],
        // ['Go to stalkering']
    ]).resize()
}

export function getBackBtn() {
    return Markup.keyboard([
        ['Back']
    ]).resize()
}

export function setMailAndPass() {
    return Markup.keyboard([
        ['Enter email'],
        ['Enter password'],
        ['Next'],
        ['Defaut profile'],
        ['Back'],
    ]).resize()
}