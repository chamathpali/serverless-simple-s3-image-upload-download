
const response = (status, data) => {
    data.status = status == 200 ? true : false;
    return {
        statusCode: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data)
    };
}

module.exports = response;