document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || 1;

    try {
        const response = await fetch(`${CONFIG.API_URL}/api/letters/${id}`);
        if (!response.ok) throw new Error("Không tìm thấy chữ cái");
        
        const result = await response.json();
        const letter = result.data || result;

        console.log("Letter data:", letter);

        document.getElementById("letter-name").innerText = letter.name;
        if (letter.image_url) {
            document.getElementById("letter-img").src = letter.image_url;
        }

        const btnPlay = document.getElementById("btn-play");
        if (btnPlay) {
            btnPlay.onclick = async (e) => {
                e.preventDefault();
                if (letter.audio_url) {
                    try {
                        // Trích xuất tên file từ URL
                        const audioFileName = letter.audio_url.split('/').pop();
                        const localAudioUrl = `assets/audio/${audioFileName}`;
                        
                        console.log("Playing audio:", localAudioUrl);
                        
                        // Try local file first
                        let response = await fetch(localAudioUrl);
                        if (!response.ok) {
                            console.warn("Local audio not found, trying backend...");
                            response = await fetch(letter.audio_url);
                        }
                        if (!response.ok) throw new Error("Không thể load audio");
                        
                        const blob = await response.blob();
                        const audioUrl = URL.createObjectURL(blob);
                        const audio = new Audio(audioUrl);
                        audio.volume = 1.0;
                        await audio.play();
                        console.log("Audio playing");
                    } catch (err) {
                        console.error("Audio play error:", err);
                        alert("Lỗi phát âm: " + err.message);
                    }
                } else {
                    alert("Âm thanh chưa được thêm cho chữ này");
                }
            };
        }
    } catch (error) {
        console.error("Lỗi chi tiết:", error);
        alert("Lỗi: " + error.message);
    }
});