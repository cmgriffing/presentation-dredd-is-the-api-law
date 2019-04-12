##

<h1>Other Examples</h1>

## Multi-Part Requests

<div class="small-link-wrapper">
[https://dredd.org/en/latest/how-to-guides.html#sending-multipart-requests](https://dredd.org/en/latest/how-to-guides.html#sending-multipart-requests)
</div>

```ruby
+ Request (multipart/form-data; boundary=CUSTOM-BOUNDARY)

    + Body

            --CUSTOM-BOUNDARY
            Content-Disposition: form-data; name="text"
            Content-Type: text/plain

            test equals to 42
            --CUSTOM-BOUNDARY
            Content-Disposition: form-data; name="json"
            Content-Type: application/json

            {"test": 42}

            --CUSTOM-BOUNDARY--
```

## Form Data


<div class="small-link-wrapper">
[https://dredd.org/en/latest/how-to-guides.html#sending-form-data](https://dredd.org/en/latest/how-to-guides.html#sending-form-data)
</div>

```ruby
# POST /data

+ Request (application/x-www-form-urlencoded)

    + Body

            test=42
```

## Uploading Images


<div class="small-link-wrapper">[https://dredd.org/en/latest/how-to-guides.html#working-with-images-and-other-binary-bodies](https://dredd.org/en/latest/how-to-guides.html#working-with-images-and-other-binary-bodies)
</div>

```ruby
# PUT /image-upload

+ Request (image/png)

+ Response 200 (application/json; charset=utf-8)
    + Body

            {"test": "OK"}
```

## Uploading Images (Hooks)

```javascript
const hooks = require('hooks');
const fs = require('fs');
const path = require('path');

hooks.beforeEach((transaction, done) => {
  const buffer = fs.readFileSync(path.join(__dirname, '../image.png'));
  transaction.request.body = buffer.toString('base64');
  transaction.request.bodyEncoding = 'base64';
  done();
});
```

## Multiple Requests/Responses

<div class="small-link-wrapper">
[https://dredd.org/en/latest/how-to-guides.html#multiple-requests-and-responses](https://dredd.org/en/latest/how-to-guides.html#multiple-requests-and-responses)
</div>

```ruby
## Resource [/resource/{id}]

+ Parameters
    + id: 42 (required)

###  Update Resource [PATCH]

+ Request (application/json)

        {"color": "yellow"}


+ Response 200 (application/json)

        {"color": "yellow", "id": 1}


+ Request Edge Case (application/json)

        {"weight": 1}

+ Response 400 (application/vnd.error+json)

        {"message": "Validation failed"}
```

## Multiple Requests/Responses (OpenAPI Caveat)

When using OpenAPI 2 format, by default Dredd tests only responses with 2xx status codes.

```javascript
var hooks = require('hooks');

hooks.before('/resource > GET > 500 > application/json', function (transaction, done) {
  transaction.skip = false;
  done();
});
```

---
