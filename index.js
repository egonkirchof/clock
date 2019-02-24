// clock.js

"use strict";

function updateClock() {
    const now = new Date()
    console.log(now);
}


timer = setInterval( updateClock, 800);
