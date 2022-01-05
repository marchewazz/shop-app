import transporter from "../util/mailConfig";

export default class MailingController {
    public sendMail(mailData: any) {
        transporter.sendMail(mailData).then((res: any) => {
            console.log(res);
        })
    }
}

