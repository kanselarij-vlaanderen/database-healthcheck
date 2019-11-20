import { sendMail } from "./utils/mail";
import { checkAlerts } from "./repository";
import mailjet from "node-mailjet";

if (!process.env.RECIPIENTS) {
    throw new Error("Recipients not defined")
} else if (!process.env.SENDER) {
    throw new Error("Sender not defined")
} else if (!process.env.MAIL_JET_API_KEY || !process.env.MAIL_JET_API_SECRET) {
    throw new Error("Mailjet not configured")
}

const mailjetConnection = mailjet.connect(process.env.MAIL_JET_API_KEY, process.env.MAIL_JET_API_SECRET);

setInterval((checkHealth), process.env.INTERVAL || 300000);

async function checkHealth() {
    await checkAlerts()
        .catch(error => retryRec(3))
}

async function retryRec(times) {
    console.log(`UNHEALTHY! retrying ${times--} more time(s)`);
    await timeout();
    const res = await checkAlerts()
        .then(() => ({ ok: true, err: null }))
        .catch(err => ({ ok: false, err }));
    if (!res.ok) {
        if (times <= 0) {
            return sendMail(mailjetConnection, res.err);
        }
        return retryRec(times);
    }
}

function timeout(timeout = 3000) {
    return new Promise(resolve => setTimeout((resolve), timeout))
}
