
export class EmailService {

    sendEmail(to:string, subject: string, message: string) {
        return `to:${to} subject:${subject} message:${message}`;
    }

}