export async function sendMail(mailjet, error) {
    const envname = process.env.ENV_NAME || '';
    const recipients = process.env.RECIPIENTS.split(",").map(mapMailAddress);
    const sender = {
        Email: process.env.SENDER.trim(),
        Name: 'Kaleidos System Alerts'
    };
    return mailjet
        .post("send", { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: sender,
                    To: recipients,
                    Subject: `[Automated message] ${envname} Database is down!`.trim(),
                    TextPart: `Querying mu-authorisation on the ${envname} environment resulted in the following error: \n ${JSON.stringify(error, null, 4)}`,
                }
            ]
        })
        .then((result) => {
            console.log(result.body);
            return result;
        })
        .catch((err) => {
            console.log("mailjet error: ", JSON.stringify(err, null , 4));
        });
}

function mapMailAddress(mail) {
    return {
        Email: mail.trim(),
        Name: mail.split('@')[0].split('.').join(' ')
    };
}
