// clock.js

"use strict";


function formatNice(number,minimunLength=2) {
    let s = number.toString();
    let prefix = minimunLength - s.length;
    if(prefix <= 0) 
        return s;
    return "0".repeat(prefix)+s;
}

function updateClock() {
    // console.log(now);        
    const now = new Date();
    hourId.innerHTML = formatNice(now.getHours(),1);
    minuteId.innerHTML = formatNice(now.getMinutes());
    secondId.innerHTML = formatNice(now.getSeconds());       
}

function updateRemote() {        
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const key = "QXWT4SV4e8GRsfiUH5dMB9k8gPjnhv" no key needed for this server
    // this server only returns hour:minute, not seconds
    const request = proxyurl+`http://worldclockapi.com/api/json/${timeZone}/now`
    //console.log("Getting time from time server...");
    //console.log(request);
    fetch(request)
      .then( res => res.json())
      .then( data => {
        let h,m;
        //console.log(data);
        const now = data.currentDateTime.split("T")[1].split("+")[0]; // "2019-02-24T20:32+01:00"
        console.log("From server:",now);
        [h,m] = now.split(":");
        hourId.innerHTML = formatNice(h,1);
        minuteId.innerHTML = formatNice(m);
        secondId.innerHTML = "00";     

    })
      .catch( err => console.log("Error: " , err));
        
    }

function getTimeFromServer(location="cet") {  
    console.log("Getting time from server...");
    timeZone = location
    if(timer) clearInterval(timer);
    setChecker(false);
    updateRemote();
    timer = setInterval( updateRemote, 60*1000);
}

function getTimeFromComputer() {
    if(timer) clearInterval(timer);
    setChecker(true);
    timer = setInterval( updateClock, 1000);       
}

function setChecker(fromComputer) {
    checkComputer.style = `display:${fromComputer?"inline":"none"}`;
    checkServer.style = `display:${!fromComputer?"inline":"none"}`;
    
}

function setAlarm() {
    console.log("Alarm:",alarmCheckBox )
}

var timeZone,timer;
var timer, hourId, minuteId, secondId;
var checkComputer,checkServer;
var alarmCheckBox;

function init() {
    console.log("Init...");
    hourId = document.getElementById("hour");
    minuteId = document.getElementById("minute");
    secondId = document.getElementById("second");
    checkComputer = document.getElementById("checkComputer");
    checkServer = document.getElementById("checkServer");    
    alarmCheckBox = document.getElementById("alarmCheckBox");
    
    if(!(hourId && minuteId && secondId)) {
        console.log("Clock elements not found.");
        return;
    }
    getTimeFromComputer();
    console.log("...done");
}


