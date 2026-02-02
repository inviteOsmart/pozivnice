AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out'
});
document.querySelectorAll('.offer-timer').forEach(timer => {
    const deadline = new Date(timer.dataset.deadline).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const diff = deadline - now;

        if (diff <= 0) {
            timer.innerHTML = "⏳ Ponuda je istekla";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        timer.innerHTML =
            "⏰ Ponuda traje još: <strong>" +
            days + "d " + hours + "h " + minutes + "min</strong>";
    }

    updateTimer();
    setInterval(updateTimer, 60000);
});