import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Users } from "../entity/Users";
import { MessageFromUserInterface } from "../interface/message.interface";
import { logger } from "../services/Loger";

export async function findUserByUserId(userId: number) {
    const userRepository = getRepository(Users);
    return userRepository.findOne({ where: { user_id: userId } });
}

export async function createUser(message: MessageFromUserInterface): Promise <Users> {
    const userRepository = getRepository(Users);
    const user = new Users();
    user.user_id = message.from.id;
    user.firstName = message.from.first_name;
    user.lastName = message.from.last_name;
    user.username = message.from.username;
    user.date_create = Date.now();
    user.last_action = Date.now();
    return userRepository.save(user);
}

export async function updateUserActionByUserId(userId: number): Promise <Users> {
    const userRepository = getRepository(Users);
    const user = await findUserByUserId(userId)
    user.last_action = Date.now();
    user.count_actions++;
    return userRepository.save(user);
}




// export class PapaController {
//     private userRepository = getRepository(Papa);
//     constructor(){}

//     async all() {
//         return this.userRepository.find();
//     }

//     async one(request: Request, response: Response, next: NextFunction) {
//         return this.userRepository.findOne(request.params.id);
//     }

//     async save() {
//         console.log('sabe')
//         return this.userRepository.query(`insert into papa ("firstName", "lastName", age) values ('RF', 'YT', 18)`);
//     }

//     async remove(request: Request, response: Response, next: NextFunction) {
//         let userToRemove = await this.userRepository.findOne(request.params.id);
//         await this.userRepository.remove(userToRemove);
//     }

// }
