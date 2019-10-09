export async function sendMail(mailjet, error) {
    const recipients = process.env.RECIPIENTS.split(",").map(mail => ({
        Email: mail.trim(),
        Name: mail.split('@')[0].split('.').join(' ')
    }));
    return mailjet
        .post("send", { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "roel@wheelhouse.be",
                        Name: "No reply"
                    },
                    To: recipients,
                    Subject: `${process.env.ENV_NAME} Database is down!`.trim(),
                    TextPart: `Querying alerts on the ${process.env.ENV_NAME} Database resulted in the following error:
                     ${JSON.stringify(error, null, 4)}`,
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
