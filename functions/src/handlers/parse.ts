import express = require('express')
import fs = require('fs');
import os = require('os');
import path = require('path');
import jKey from './keyFile';

import { v4 as uuidv4 } from 'uuid'

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

router.post('/', async (req: express.Request, res: express.Response) => {
    await ParseUpload(req, res)
});

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("<a href='https://github.com/daniel-sudz/UWB-Hackathon'>Check Out Repo for More Details</a>")
});

async function ParseUpload(req: express.Request, res: express.Response) {

    let jKeyString = JSON.stringify(jKey);

    fs.writeFileSync(path.join(os.tmpdir(), "key.json"), jKeyString);

    let jsonData = req.body as reqBody
    let allKeys = Object.keys(jsonData)

    const bucket = "coronatime-7b908.appspot.com"

    let data: string[][] = []

    console.log("Total Pictures: " + allKeys.length)

    let uuid = uuidv4()

    let promises: Promise<void>[] = []

    allKeys.forEach(async (key) => {
        let picPath = path.join(os.tmpdir(), key + ".jpg")

        fs.writeFileSync(picPath, jsonData[key].base64.substring(23), { encoding: 'base64' });
        promises.push(upload(bucket, uuid, picPath, key + ".jpg", "image/jpeg"))

        let directory = 'gs://' + bucket + '/' + uuid + '/' + key + '.jpg'

        // For each label
        jsonData[key].data.forEach((element) => {
            data.push(["UNASSIGNED", directory, element.label, String(element.min_x.toPrecision(3)), String(element.min_y.toPrecision(3)),
                String(element.max_x.toPrecision(3)), String(element.min_y.toPrecision(3)), String(element.max_x.toPrecision(3)),
                String(element.max_y.toPrecision(3)), String(element.min_x.toPrecision(3)), String(element.max_y.toPrecision(3))])
        })
    });
    //String(parseFloat(element.min_x).toPrecision(3))
    let csv = data.map(function (d) {
        return d.join();
    }).join('\n');


    let csvName = "result.csv"

    fs.writeFileSync(path.join(os.tmpdir(), csvName), csv, 
    {
        encoding: "ASCII"
    });
    promises.push(upload(bucket, uuid, path.join(os.tmpdir(), csvName), csvName,'text/csv'))

    try
    {
        await Promise.all(promises)
    }
    catch(e)
    {
        console.log(e)
    }

    res.send('gs://' + bucket + '/' + uuid + '/' + csvName)
}

async function upload(bucketName: string, folder: string, filelocation: string, filename: string, ct: string): Promise<void> {
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
        await storage.bucket(bucketName).upload(
            filelocation, {
            destination: folder + '/' + filename,
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                contentType: ct,
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        }
        );

        console.log(`${filename} uploaded to ${bucketName}.`);
    }

    return uploadFile().catch(console.error);
    // [END storage_upload_file]
}

export default router
