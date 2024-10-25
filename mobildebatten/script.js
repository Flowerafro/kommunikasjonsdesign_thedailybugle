function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        (rect.top <= 0 && rect.bottom >= 0) ||
        (rect.top >= 0 && rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth))

    );
}

//EVENTLISTENER TO CONTROL CHANGES
document.addEventListener('scroll', function () {
    if (isInViewport(document.getElementById("img1"))) {
        document.getElementById("section__parallax").style.backgroundImage = "url(IMG/student1.jpeg)"
    }
    if (isInViewport(document.getElementById("img1-1"))) {
        document.getElementById("section__parallax").style.backgroundImage = "url(IMG/student1.1.png)"
    }
    if (isInViewport(document.getElementById("img2"))) {
        document.getElementById("section__parallax").style.backgroundImage = "url(IMG/student2.jpeg)"
    }
    if (isInViewport(document.getElementById("img2-1"))) {
        document.getElementById("section__parallax").style.backgroundImage = "url(IMG/student2.1.png)"
    }
}, {
    passive: true
});

//EVENTLISTENER TO ZOOM

window.addEventListener('scroll', function () {
    const img = document.getElementById('img01');
    const scrollPosition = window.scrollY;
    const scaleFactor = 1 + scrollPosition / 1000; // Adjust the divisor to control the zoom speed

    img.style.transform = `scale(${scaleFactor})`;
});