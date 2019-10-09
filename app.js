import { sendMail } from "./utils/mail";
import { checkAlerts } from "./repository";
import mailjet from "node-mailjet";

const mailjetConnection = mailjet.connect(process.env.MAIL_JET_API_KEY, process.env.MAIL_JET_API_SECRET);

if(!process.env.RECIPIENTS) {
    throw new Error("Recipients not defined")
}
checkHealth();

setInterval((checkHealth), process.env.INTERVAL || 300000);

function throwError(alerts) {
    throw new Error(`Alerts query does not return expected result: \n ${JSON.stringify(alerts, null, 4)}`);
}

function checkHealth() {
    checkAlerts()
        .then(alerts => Array.isArray(alerts)
            ? console.log('HEALTHY!')
            : throwError(alerts))
        .catch(error => sendMail(mailjetConnection, error))
}
