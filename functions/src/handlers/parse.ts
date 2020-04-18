import express = require('express')
import fs = require('fs');
import os = require('os');
import path = require('path');

const router = express.Router()

// Compile error > Runtime error
// Only has these fields and can access these fields
interface reqBody {
    [key: string]:
    {
        base64: string,
        data: {
            min_x: number,
            max_x: number,
            min_y: number,
            max_y: number,
            label: string
        }[]
    }
}

router.post('/', (req: express.Request, res: express.Response) => {
    let jsonData = req.body as reqBody
    let allKeys = Object.keys(jsonData)

    const bucket = "coronatime-7b908.appspot.com"

    let data: string[][] = [["set", "path", "label", "x_min", "y_min", "x_max", "y_min", "x_max", "y_max", "x_min", "y_max"]]

    allKeys.forEach((key) => {
        let picPath = path.join(os.tmpdir(), key + ".jpg")

        fs.writeFile(picPath, jsonData[key].base64.split(';base64,').pop(), { encoding: 'base64' }, function (err) {
            console.log(picPath + " was created")
        });       

        upload(bucket, picPath)
        let directory = 'gs://' + bucket + '/' + key + ".jpg"


        // For each label
        jsonData[key].data.forEach((element) => {

            let option = ""
            let x = Math.random() * 10;

            if (x < 1)
                option = "VALIDATE"
            else if (x < 2)
                option = "TEST"
            else
                option = "TRAIN"

            data.push([option, directory, element.label, element.min_x.toString(), element.min_y.toString(),
                element.max_x.toString(), element.min_y.toString(), element.max_x.toString(),
                element.max_y.toString(), element.min_x.toString(), element.max_y.toString()])
        })
    });

    var csv = data.map(function (d) {
        return d.join();
    }).join('\n');

    res.send(csv)
});

function upload(bucketName: string, filename: string) {
    // [START storage_upload_file]
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const bucketName = 'Name of a bucket, e.g. my-bucket';
    // const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';

    // Imports the Google Cloud client library
    const { Storage } = require('@google-cloud/storage');
    // Creates a client
    const storage = new Storage({ keyFilename: path.join(os.tmpdir(), "key.json") });

    async function uploadFile() {
        // Uploads a local file to the bucket
        await storage.bucket(bucketName).upload(filename, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        });

        console.log(`${filename} uploaded to ${bucketName}.`);
    }

    uploadFile().catch(console.error);
    // [END storage_upload_file]
}

export default router
