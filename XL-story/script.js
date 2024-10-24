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
    passive: true
});

/* eventlistener som starter og slutter heart-top og counter  */
document.addEventListener('scroll', function () {
    const heartHeader = document.getElementById("heart-header");
    const pulseCounter = document.getElementById("counter");

    if (inViewport(document.getElementById("article-1"))) {
        heartHeader.style.display = "flex";
        pulseCounter.style.display = "block";
    } else {
        heartHeader.style.display = "none";
        pulseCounter.style.display = "none";
    }
}, {
    passive: true
});