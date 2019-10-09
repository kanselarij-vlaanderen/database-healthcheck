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

checkHealth();
setInterval((checkHealth), process.env.INTERVAL || 300000);

function checkHealth() {
    checkAlerts()
        .then(alerts => Array.isArray(alerts)
            ? console.log('HEALTHY!')
            : throwError(alerts))
        .catch(error => sendMail(mailjetConnection, error))
}

function throwError(alerts) {
    throw new Error(`Alerts query does not return expected result: \n ${JSON.stringify(alerts, null, 4)}`);
}
