import { findUserByUserId, createUser, updateUserActionByUserId } from "../controller/UsersController"
import { Users } from "../entity/Users"
import { CheckUserResultInterface } from "../interface/check-user.inreface"
import { logger } from "./Loger"

export async function checkUser(ctx) {
    const checkResult: CheckUserResultInterface = {
        creating: true,
        user: await findUserByUserId(ctx.message.from.id)
    }

    // const user: Users = await findUserByUserId(ctx.message.from.id)

    if (!checkResult.user) {
        const user: Users = await createUser(ctx.message)
        logger.warn(`User created: id - ${user.user_id}, login - ${user.username}, name - ${user.firstName}`)
        checkResult.creating = false
        checkResult.user = user
    }
    // else {
    //     checkResult.creating = true
    //     checkResult.user = user
    // }
    return checkResult
}

export async function updateUserActions(ctx) {
    return await updateUserActionByUserId(ctx.message.from.id)
}