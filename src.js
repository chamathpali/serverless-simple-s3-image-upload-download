'use strict';
var log = require('../lib/logger'),
    response = require('../lib/response');

const AWS = require('aws-sdk');
var s3 = new AWS.S3();

const S3_BUCKET = "BUCKET_NAME"

module.exports.upload = async event => {
    const data = JSON.parse(event.body);
    let decodedImage = Buffer.from(data.image, 'base64');
    var params = {
        "Body": decodedImage,
        "Bucket": S3_BUCKET,
        "Key": 'images/' + data.id + '.' + data.ext,
        ContentEncoding: 'base64',
        ContentType: data.type
    };
    var upload_status = await upload_img(params)
    return upload_status
};

module.exports.get = async event => {
    const data = JSON.parse(event.body);

    if (!data.key) {
        return response(400, { 'message': 'Missing Image key field', data: {} });
    }
    var params = {
        "Bucket": S3_BUCKET,
        "Key": data.key
    };
    var get_status = await get_img(params)
    return get_status
};

function upload_img(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) {
                const log_ref = log({ type: "ERROR", message: err, callstack: "", payload: event });
                return response(500, { 'message': 'Failed to upload image', reference: log_ref });
            } else {
                resolve(response(200, { 'key': params.Key }))
            }
        });
    });
}

function get_img(params) {
    return new Promise(function (resolve, reject) {
        s3.getObject(params, function (err, data) {
            if (err) {
                const log_ref = log({ type: "ERROR", message: err, callstack: "", payload: event });
                return response(500, { 'message': 'Failed to load image', reference: log_ref });
            } else {
                resolve(response(200, { 'src': 'data:'+data.ContentType+';base64,'+data.Body.toString('base64') }))
            }
        });
    });
}
