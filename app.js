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
            : retry(3))
        .catch(error => sendMail(mailjetConnection, error))
}

function retry(times, err) {
    setTimeout(() =>
        times >= 0
            ? checkAlerts()
                .then(alerts => Array.isArray(alerts)
                    ? console.log('HEALTHY!')
                    : retry(--times, alerts))
            : throwError(err), 3000)

}

function throwError(alerts) {
    throw new Error(`Alerts query does not return expected result: \n ${JSON.stringify(alerts, null, 4)}`);
}
