const fs = require('fs')
const http = require('http')
let Request = require("request")
const Stream = require('stream')

//requests for the api
Request.get("https://coderbyte.com/api/challenges/json/age-counting", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    let data = JSON.parse(body).data

    let singleData = data.split(" ")
    
    // console.log(singleData);

    //this is to count the number of elements with age = 32
    let count = 0
    for( let index = 0; index < singleData.length; index++) {
        if (singleData[index] == 'age=32,') {
            count++ 
        }
    }
    console.log(count) //gives a count of 6
    
    //creating a readstream and writestream
    let myWriteStream = fs.createWriteStream(__dirname + '/output.txt')
    const readable = new Stream.Readable()

    readable.pipe(myWriteStream)

    for(index = 0; index < singleData.length; index+=2) {
        readable.push(singleData[index] + "\n\n")
    }

    // no more data
    readable.push(null)
});