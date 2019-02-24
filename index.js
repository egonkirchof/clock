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


