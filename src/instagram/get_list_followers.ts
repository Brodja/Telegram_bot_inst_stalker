import { clickByTagName, getInfoFromList, scrollList } from "./parser"

export async function getListFollowers(page, nickname: string) {
    await clickByTagName(page, nickname, 'followers')
    await scrollList(page, 'div.isgrP', 1)
    await getInfoFromList(page)
    //div.isgrP
    //.PZuss
    console.log('FINDING')
}