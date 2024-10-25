let pulse = 60;
const maxPulse = 240;
const incrementPulse = 1; // Increment by 1 each interval
const intervalTime = 2000; // Interval time in milliseconds (adjust as needed)

function updateCount() {
    if (pulse < maxPulse) {
        pulse += incrementPulse;
        document.getElementById("counter").innerHTML = Math.min(Math.floor(pulse), maxPulse);
    } else {
        clearInterval(counterInterval); // Stop the interval when maxPulse is reached
    }
}

// Starter pulstelleren
const counterInterval = setInterval(updateCount, intervalTime);


/* Sjekker om noe er i viewport (For å skru av hjerte-animasjon) */
function inViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

/* eventlistener som starter og slutter heart-center  */
document.addEventListener('scroll', function () {
    const heartOpacity = document.getElementById("heart-center");

    if (inViewport(document.getElementById("intro"))) {
        heartOpacity.style.display = "flex";
    } else {
        heartOpacity.style.display = "none";
    }
}, {
    passive: true /* betyr at nettleseren ikke vil kalle på preventDefault() */
});

/* eventlistener som starter og slutter heart-top og counter  */
document.addEventListener('scroll', function () {
    const heartHeader = document.getElementById("heart-header");
    const pulseCounter = document.getElementById("counter");

    if (inViewport(document.getElementById("article-1"))) {
        heartHeader.style.display = "flex";
        pulseCounter.style.display = "flex";
    } else {
        heartHeader.style.display = "none";
        pulseCounter.style.display = "none";
    }
}, {
    passive: true
});
