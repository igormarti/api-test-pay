

export class MessagersService {


    sendToQueue(queue:string, message:any) {
        return `queue:${queue} message:${message}`;
    }

}