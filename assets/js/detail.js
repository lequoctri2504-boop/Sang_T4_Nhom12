document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        const response = await fetch(`${CONFIG.API_URL}/api/letters/${id}`);
        const letter = await response.json();

        document.getElementById("letter-name").innerText = letter.name;
        document.getElementById("letter-img").src = `${CONFIG.API_URL}/storage/letters/${letter.image}`;

        document.getElementById("btn-play").onclick = () => {
            const audio = new Audio(`${CONFIG.API_URL}/storage/audio/${letter.audio}`);
            audio.play();
        };
    } catch (error) {
        console.error("Lỗi chi tiết:", error);
    }
});