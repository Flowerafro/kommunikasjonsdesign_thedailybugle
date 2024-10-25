/* window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const img = header.querySelector('img');
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollPosition / maxScroll;

    const animationProgress = Math.min(scrollFraction * 1.0, 1);

    if (animationProgress < 1) {
        img.style.transform = `translate(-50%, -${100 - (40 * animationProgress)}%) scale(${1 + (2.5 * animationProgress)})`;
        img.style.opacity = `${0.1 + (0.8 * animationProgress)}`;
    } else {
        img.style.transform = `translate(-50%, -60%) scale(3.5)`;
        img.style.opacity = `0.9`;
    }
}); */

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const img = header.querySelector('img');
    const h1 = header.querySelector('h1');

    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollPosition / maxScroll;

    const animationProgress = Math.min(scrollFraction * 1.0, 1);

    h1.style.opacity = `${0.1 + (0.9 * animationProgress)}`;
    img.style.transform = `translate(-50%, -${100 - (40 * animationProgress)}%) scale(${1 + (2.5 * animationProgress)})`;
    img.style.opacity = `${0.1 + (0.9 * animationProgress)}`;
});