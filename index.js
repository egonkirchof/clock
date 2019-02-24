// clock.js

"use strict";

var timer, hourId, minuteId, secondId;

function formatNice(number,minimunLength=2) {
    let s = number.toString();
    let prefix = minimunLength - s.length;
    if(prefix <= 0) 
        return s;
    return "0".repeat(prefix)+s;
}

function updateClock() {
    const now = new Date();
    // console.log(now);
    hourId.innerHTML = formatNice(now.getHours(),1);
    minuteId.innerHTML = formatNice(now.getMinutes());
    secondId.innerHTML = formatNice(now.getSeconds());
    
}

function getTimeFromServer(location="Barcelona") {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const key = "QXWT4SV4e8GRsfiUH5dMB9k8gPjnhv"
    const request = proxyurl+`https://www.amdoren.com/api/timezone.php?api_key=${key}&loc=${location}`
    console.log("Getting time from time server...");
    console.log(request);
    fetch(request)
      .then( res => res.json())
      .then( data => {
        console.log(data);
    })
      .catch( err => console.log("Error: " , err));
}
function init() {
    console.log("Init...");
    hourId = document.getElementById("hour");
    minuteId = document.getElementById("minute");
    secondId = document.getElementById("second");
    if(!(hourId && minuteId && secondId)) {
        console.log("Clock elements not found.");
        return;
    }
    timer = setInterval( updateClock, 1000);    
    console.log("...done");
}


