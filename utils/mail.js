export async function sendMail(mailjet, error) {
    const envname = process.env.ENV_NAME || '';
    const recipients = process.env.RECIPIENTS.split(",").map(mapMailAddress);
    const sender = mapMailAddress(process.env.SENDER, 'Kaleidos System Alerts');
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
        })
        .catch((err) => {
            console.log("mailjet error: ", response.Response.IncomingMessage.text);
        });
}

function mapMailAddress(mail, name) {
    return {
        Email: mail.trim(),
        Name: name || mail.split('@')[0].split('.').join(' ')
    };
}
