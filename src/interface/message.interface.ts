export class MessageFromUserInterface {
    message_id: number;
    from: MessageFromInterface;
    date: number;
}

export class MessageFromInterface {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}

