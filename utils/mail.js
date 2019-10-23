export async function sendMail(mailjet, error) {
    const recipients = process.env.RECIPIENTS.split(",").map(mapMail);
    const sender = mapMail(process.env.SENDER);
    const envname = process.env.ENV_NAME || '';
    return mailjet
        .post("send", { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: sender,
                    To: recipients,
                    Subject: `${envname} Database is down!`.trim(),
                    TextPart: `Querying alerts on the ${envname} Database resulted in the following error: \n ${JSON.stringify(error, null, 4)}`,
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

function mapMail(mail) {
    return {
        Email: mail.trim(),
        Name: mail.split('@')[0].split('.').join(' ')
    };
}
