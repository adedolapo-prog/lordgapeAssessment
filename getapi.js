const fs = require('fs')
const http = require('http')
let Request = require("request")
const Stream = require('stream')


Request.get("https://coderbyte.com/api/challenges/json/age-counting", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    let data = JSON.parse(body).data

    let singleData = data.split(" ")
    
    // console.log(singleData);

    let count = 0
    for( let index = 0; index < singleData.length; index++) {
        if (singleData[index] == 'age=32,') {
            count++ 
        }
    }
    console.log(count)
    
    let myWriteStream = fs.createWriteStream(__dirname + '/output.txt')
    const readable = new Stream.Readable()

    readable.pipe(myWriteStream)

    singleData.forEach(item => {
        readable.push(item + "\n\n")

    })

    // no more data
    readable.push(null)
});

