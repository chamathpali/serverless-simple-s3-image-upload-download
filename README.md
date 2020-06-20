# A Simple S3 image upload and getting the base64 back from S3
### Use in a Serverless/lambda function 🚀

#### 📷 Few usage for uploading/downloading images through serverless/lambda functions. 📷
- handle authentication parts (ex: adding a cognito id to the path etc.)
- handle thumbnail generation
- handle image manipulation on the fly
- anything you need...

Refer the src.js for full code

### S3 Upload
```javascript
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
```

### S3 Download as Base64 String
```javascript
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
```

