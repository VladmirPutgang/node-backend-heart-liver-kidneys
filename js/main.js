// Need event listeners for each of the organ buttons, when triggered they fetch the /organ api
document.getElementById('heart').addEventListener('click', chooseHeart);
document.getElementById('liver').addEventListener('click', chooseLiver);
document.getElementById('kidneys').addEventListener('click', chooseKidneys);


function winOrLose(win) {
    const winSpot = document.getElementById('result');
    if (win == true) {
        console.log()
        winSpot.innerText = 'Player Wins';
    } else {
        winSpot.innerText = 'Player Loses';
    }
}

// When the player makes their selection by clicking an organ button, the corresponding async function below reaches out to the server with a fetch request for the url+"/organ", the specific /organ of each fetch request tells the server which organ the player selected, and so we set up paths for each option in the server.js file.
async function chooseHeart() {
    console.log('heart')
    const res = await fetch('/heart')
    const data = await res.json()
    winOrLose(data.win)
    console.log(data)
}
async function chooseLiver() {
    console.log('liver')
    const res = await fetch('/liver')
    const data = await res.json()
    winOrLose(data.win)
    console.log(data)
}
async function chooseKidneys() {
    console.log('kidneys')
    const res = await fetch('/kidneys')
    const data = await res.json()
    winOrLose(data.win)
    console.log(data)
}



// Worked on and broken by vladmirputgang, aileen, Epicat, mfscodes, Musina123, Neuroleptique, spideydan

// and again by Aileen, Mussina123, Neuroleptique, and VladmirPutgang.