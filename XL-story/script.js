/* Sjekker om noe er i viewport (For å skru av hjerte-animasjon) */
function inViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

/* eventlistener som viser når pulse-animation er på (når id intro er i viewport) og av */
document.addEventListener('scroll', function () {
    const heartOpacity = document.getElementById("heart-opacity");
    const heartOpacityEnd = document.getElementById("heart-opacity-end");

    if (inViewport(document.getElementById("article"))) {
        heartOpacity.style.display = "none";
        heartOpacityEnd.style.display = "none";
    } else if (inViewport(document.getElementById("outro"))) {
        heartOpacity.style.display = "flex";
        heartOpacityEnd.style.display = "none";
    } else if (inViewport(document.getElementById("theend"))) {
        heartOpacity.style.display = "none";
        heartOpacityEnd.style.display = "flex";
    } else {
        heartOpacity.style.display = "flex";
        heartOpacityEnd.style.display = "none";
    }
}, {
    passive: true
});