import { logger } from "../services/Loger";

export async function clickByTagName(page, profile_name: string, tag: string) {
    const link = await page.$(`a[href*="/${profile_name}/${tag}/"]`);
    if (link) await link.click();
    logger.debug(`Click into tag`);
    await page.waitFor(3000);
}

export async function scrollList(page, selector: string, len: number) {
    const countArr = new Array(len)
    for (const i of countArr) {
        try {
            await page.$eval(`${selector}`,
                e => {
                    e.scrollTop = e.scrollTop + 2000
                    return e
                }
            )
        }
        catch (e) {
            console.log(e)
        }
        await page.waitFor(3000);
    }
    logger.debug(`scroll was finished`);
}

export async function getInfoFromList(page) {
    const result = await page.evaluate(() => {
        let data = [];
        let elements = Array.from(document.querySelectorAll('.PZuss')[0].childNodes)
        console.log('elements', elements)

        // for(let i = 0; i < elements.length; i++){
        //     console.log(elements[i])
        //     let login = element[i].children[0].children[0].children[1].children[0].children[0].children[0].innerText
        //     let name = element[i].children[0].children[0].children[1].children[1].innerText
        //     data.push({ login, name });
        // }
        for (let element of elements) {
            console.log(element)
            console.log(element.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0])
            // let login = element.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText
            // let name = element.children[0].children[0].children[1].children[1].innerText
            // data.push({ login, name }); // Помещаем объект с данными в массив
        }
        // return data
    })
    // console.log('result', result)
    // console.log('length', result.length)
}




export async function goToProfile(page, profile_name) {
    await page.goto(`https://www.instagram.com/${profile_name}/`);
    const link = await page.$(`a[href*="/${profile_name}/following/"]`);
    if (!link){
         throw new Error("Profile not found");
    } else {
        return page
    }
    // await openFollowing(page, profile_name)
    // await scrollList(page, `div.isgrP`, 11)
    // await getInfo(page)
}

async function openFollowing(page, profile_name) {
    const link = await page.$(`a[href*="/${profile_name}/following/"]`);
    if (link) await link.click();
    await page.waitFor(3000);
}

// async function scrollList(page, selector, len) {
//     const countArr = new Array(len)
//     for (const i of countArr) {
//         try {
//             await page.$eval(`${selector}`,
//                 e => {
//                     e.scrollTop = e.scrollTop + 2000
//                     return e
//                 }
//             )
//         }
//         catch (e) {
//             console.log(e)
//         }
//         await page.waitFor(3000);
//     }
// }

async function getInfo(page) {
    const result = await page.evaluate(() => {
        let data = [];
        let elements = Array.from(document.querySelectorAll('.PZuss')[0].childNodes)
        // for(let i = 0; i < elements.length; i++){
        //     console.log(elements[i])
        //     let login = element[i].children[0].children[0].children[1].children[0].children[0].children[0].innerText
        //     let name = element[i].children[0].children[0].children[1].children[1].innerText
        //     data.push({ login, name });
        // }
        for (var element of elements) {
            console.log(element)
            // let login = element.children[0].children[0].children[1].children[0].children[0].children[0].innerText
            // let name = element.children[0].children[0].children[1].children[1].innerText
            // data.push({ login, name }); // Помещаем объект с данными в массив
        }
        return data
    })
    console.log('result', result)
    console.log('length', result.length)
}