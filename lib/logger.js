const app_name = process.env.APP_NAME;
const app_stage = process.env.APP_STAGE;
const service_name = process.env.SERVICE_NAME;
const { v4: uuidv4 } = require('uuid');

const log = (payload) => {
    const log_ref =  uuidv4() 
    payload = { log_ref:log_ref , app_name, app_stage, service_name, ...payload }
    console.log(JSON.stringify(payload));
    return log_ref;
}

module.exports = log;