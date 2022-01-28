import { Markup } from 'telegraf'

export function getMainMenu() {
    return Markup.keyboard([
        ['Authorize your account'],
        ['Use default profile'],
        // ['Get statistic'],
        // ['Go to stalkering']
    ]).resize()
}

export function getMainMenuInline(){
    return Markup.inlineKeyboard([
        Markup.button.callback('Authorize your account', 'authorize_account'),
        Markup.button.callback('Use default profile', 'use_default_profile')
    ], {columns: 1})
}

export function MenuActions(){
    return Markup.inlineKeyboard([
        // Markup.button.callback('Get counts f,f,p', 'authorize_account'),
        Markup.button.callback('Get List Followers', 'get_list_followers'),
        Markup.button.callback('Get List Following', 'get_list_following'),
        Markup.button.callback('Get Last Post', 'get_last_post'),
        Markup.button.callback('Get List Posts', 'get_list_posts'),
    ], {columns: 1})
}

export function getBackBtn() {
    return Markup.keyboard([
        ['To start']
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