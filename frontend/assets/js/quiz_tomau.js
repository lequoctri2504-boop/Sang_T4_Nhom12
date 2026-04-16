const listLetters = ["A", "B", "C", "D", "E"];
let currentIdx = 0;
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let hasPaintedCorrect = false;

function setupCanvas() {
    ctx.strokeStyle = '#04647d';
    ctx.lineWidth = 45; 
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

function loadLetter() {
    const char = listLetters[currentIdx];
    
    // Đổi chữ trên tiêu đề và chữ bóng mờ
    const titleElem = document.getElementById('current-letter-title');
    const displayElem = document.getElementById('display-letter');
    
    if (titleElem) titleElem.innerText = char;
    if (displayElem) displayElem.innerText = char;
    
    hasPaintedCorrect = false; 
    clearCanvas();
}

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = (e.clientX || (e.touches && e.touches[0].clientX));
    const clientY = (e.clientY || (e.touches && e.touches[0].clientY));
    const scaleX = 800 / rect.width;
    const scaleY = 500 / rect.height;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e.touches[0]); });

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    const pos = getPos(e);
    ctx.moveTo(pos.x, pos.y);
}

canvas.addEventListener('mousemove', (e) => { if (isDrawing) handleDraw(e); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isDrawing) handleDraw(e.touches[0]); });

function handleDraw(e) {
    const pos = getPos(e);
    // Vùng trung tâm để bé tô trúng là tính điểm
    if (pos.x > 150 && pos.x < 650 && pos.y > 50 && pos.y < 450) {
        hasPaintedCorrect = true; 
    }
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

window.addEventListener('mouseup', () => isDrawing = false);
window.addEventListener('touchend', () => isDrawing = false);

function finishPainting() {
    const data = ctx.getImageData(0, 0, 800, 500).data;
    const isCanvasEmpty = !Array.from(data).some((p, i) => i % 4 === 3 && p > 0);

    if (isCanvasEmpty) {
        alert("Bé hãy tô chữ trước nhé!");
        return;
    }

    if (hasPaintedCorrect) {
        document.getElementById('feedback-overlay').classList.remove('hidden');
    } else {
        document.getElementById('fail-overlay').classList.remove('hidden');
    }
}

function nextStep() {
    // 1. Cộng sao vào localStorage
    let stars = parseInt(localStorage.getItem('userStars')) || 0;
    stars += 1;
    localStorage.setItem('userStars', stars);

    // 2. Hiện sao lên màn hình
    const starElement = document.getElementById('star-count');
    if (starElement) starElement.innerText = stars;

    // 3. Đóng thông báo
    document.getElementById('feedback-overlay').classList.add('hidden');

    // 4. CHUYỂN CÂU
    if (currentIdx < listLetters.length - 1) {
        currentIdx++; 
        loadLetter(); // Chuyển từ A -> B, B -> C...
    } else {
        // Hết 5 câu về trang kết quả
        window.location.href = "result.html?score=" + stars + "&type=tomau";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedStars = localStorage.getItem('userStars') || 0;
    const starElement = document.getElementById('star-count');
    if (starElement) starElement.innerText = savedStars;
});

function closeFail() {
    document.getElementById('fail-overlay').classList.add('hidden');
    clearCanvas();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setupCanvas();
}

// Audio mapping for all 29 letters
const audioMap = {
    'A': 'a.mp3',
    'Ă': 'aw.mp3',
    'Â': 'aa.mp3',
    'B': 'b.mp3',
    'C': 'c.mp3',
    'D': 'd.mp3',
    'Đ': 'dđ.mp3',
    'E': 'e.mp3',
    'Ê': 'ee.mp3',
    'G': 'g.mp3',
    'H': 'h.mp3',
    'I': 'i.mp3',
    'K': 'k.mp3',
    'L': 'l.mp3',
    'M': 'm.mp3',
    'N': 'n.mp3',
    'O': 'o.mp3',
    'Ô': 'oo.mp3',
    'Ơ': 'ơ.mp3',
    'P': 'p.mp3',
    'Q': 'q.mp3',
    'R': 'r.mp3',
    'S': 's.mp3',
    'T': 't.mp3',
    'U': 'u.mp3',
    'Ư': 'ư.mp3',
    'V': 'v.mp3',
    'X': 'x.mp3',
    'Y': 'y.mp3'
};

// Play audio for current letter being painted
async function playTomauAudio() {
    const currentLetter = document.getElementById('current-letter-title')?.innerText || 'A';
    const audioFile = audioMap[currentLetter];
    
    if (!audioFile) {
        console.warn('Audio file not found for letter:', currentLetter);
        return;
    }
    
    try {
        // Try to fetch from local assets first
        const response = await fetch(`../assets/audio/${audioFile}`);
        if (response.ok) {
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            audio.play();
            return;
        }
    } catch (error) {
        console.log('Local audio fetch failed, trying backend:', error.message);
    }
    
    try {
        // Fallback to backend
        const apiUrl = CONFIG?.API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/storage/audio/${audioFile}`);
        if (response.ok) {
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.error('Backend audio not found:', audioFile);
        }
    } catch (error) {
        console.error('Error playing audio:', error);
    }
}

window.onload = loadLetter;