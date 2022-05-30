/* The server will recieve a url request that specifies the users organ choice by adding /organ to the url. After recieving the user's organ choice, the server randomly chooses 1-3 which corresponds to the computers organ choice. Win/loss criteria is evaluated on the server, and the server responds to the browser with a JSON specifying the user's choice, the computer's choice, and a boolean condition indicating whether the player won.
*/


// Require the node modules to make this work
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');


// When this function is called it randomly selects an organ representing the computers choice, returns the organ as a string.
function computerChoice() {
    const computerResponse = Math.ceil(Math.random() * 3);
    // console.log(computerResponse);
    if (computerResponse == 1) {
        console.log('heart')
        return ('heart');
    } else if (computerResponse == 2) {
        console.log('liver')
        return ('liver');
    } else {
        console.log('kidney')
        return ('kidneys');
    }
}

// The function takes 2 parameters, the user's choice, and the computer's choice and evaluates whether the player won, if so it returns true, if the player loses it returns false.
function winOrLose(userChoice, computerOrgan) {
    if (userChoice == computerOrgan)
        console.log("User choice is: " + userChoice);
    console.log("Computer choice is: " + computerOrgan);
    if (userChoice == 'heart') {
        if (computerOrgan == 'liver') {
            return true
        }
        else {
            return false;
        }
    } else if (userChoice == 'liver') {
        if (computerOrgan == 'kidneys') {
            return true;
        } else {
            return false;
        }
    } else {
        if (computerOrgan == 'heart') {
            return true;
        } else {
            return false;
        }
    }
}

// Below is the node core modules doing their things.
// the http server is created so Node can access and handle http requests
const server = http.createServer((req, res) => {
    // The page variable will be the users /organ choice that will be on the end of the url
    const page = url.parse(req.url).pathname;

    // I got rid of the parameters because we were not using them.

    // Logs the /organ or other path requested on the server side terminal/console
    console.log(page);

    // if the http request is url/ with no additional path, the server will respond by reading the index.html file on the server, and sending a copy of that html to the browser.
    if (page == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });

        // if the http request is url/heart, the user choice was heart. 
    } else if (page == '/heart') {
        // The const win is a ternary that depends on whether the winOrLose function returns true or false. The winOrLose function is a higher order function because the second parameter it recieves is the computerChoice function. The computerChoice is a callback function because the function is being passed as an argument for the winOrLose function.
        const win = (winOrLose('heart', computerChoice())) ? true : false;
        console.log(`Player win: ${win}`);

        // Variable that formats an object so that it can be converted into a json
        const objToJson = {
            win: win
        }
        // writes a header, code 200 indicates success, and alerts the content type the server will return
        // !(may need to change Content-Type to application/json?)!
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // responds with a json version of the objToJson
        res.end(JSON.stringify(objToJson));

    } else if (page == '/liver') {
        // const botChoice = computerChoice();
        const win = (winOrLose('liver', computerChoice())) ? true : false;
        console.log(`Player win: ${win}`);
        const objToJson = {
            win: win
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(objToJson));

    } else if (page == '/kidneys') {
        // const botChoice = computerChoice();
        const win = (winOrLose('kidneys', computerChoice())) ? true : false;
        console.log(`Player win: ${win}`);
        const objToJson = {
            win: win
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(objToJson));

    } else if (page == '/js/main.js') {
        fs.readFile('js/main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("404");
    }
});

server.listen(8000)

// Worked on and broken by vladmirputgang, aileen, Epicat, mfscodes, Mussina123, Neuroleptique, spideydan

// and again by Aileen, Mussina123, Neuroleptique, and VladmirPutgang.