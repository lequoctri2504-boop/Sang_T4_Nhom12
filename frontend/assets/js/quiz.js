// =======================
// 1. DATA
// =======================
const quizData = [
    { correct: "A", options: ["A","B","C","D"], sound: "assets/audio/a.mp3" },
    { correct: "B", options: ["E","B","G","H"], sound: "assets/audio/b.mp3" },
    { correct: "C", options: ["I","K","C","L"], sound: "assets/audio/c.mp3" },
    { correct: "D", options: ["M","N","O","D"], sound: "assets/audio/d.mp3" }
];

// =======================
// 2. BIẾN
// =======================
let currentScore = 0;
let currentIndex = 0;

// =======================
// 3. LOAD CÂU HỎI
// =======================
function loadQuestion() {
    const currentQuiz = quizData[currentIndex];

    document.getElementById('q-number').innerText = currentIndex + 1;

    const buttons = document.querySelectorAll('.quiz-bubble');

    buttons.forEach((btn, index) => {
        btn.innerText = currentQuiz.options[index];
        // Reset lại trạng thái ban đầu cho các nút
        btn.classList.remove('correct-shake-glow', 'wrong-shake');
        btn.style.backgroundColor = 'white';
    });
}

// =======================
// 4. CHECK ĐÁP ÁN
// =======================
function checkAnswer(selected, element) {
    const currentQuiz = quizData[currentIndex];
    const selectedLetter = element.innerText;

    // Ngăn chặn bấm nhiều lần khi đã chọn đúng/sai
    if (element.classList.contains('correct-shake-glow') || element.classList.contains('wrong-shake')) return;

    if (selectedLetter === currentQuiz.correct) {
        currentScore++;
        element.classList.add('correct-shake-glow');

        // Hiện overlay chúc mừng sau 0.6s
        setTimeout(() => {
            document.getElementById('feedback-overlay').classList.remove('hidden');
        }, 600);
    } else {
        element.classList.add('wrong-shake');

        // Hiện overlay báo sai sau 0.4s
        setTimeout(() => {
            document.getElementById('fail-overlay').classList.remove('hidden');
        }, 400);
    }
}

// =======================
// 5. NEXT (CẬP NHẬT: CỘNG SAO VÀ CHUYỂN CÂU)
// =======================
function nextQuestion() {
    // 1. Cộng 1 sao vào kho lưu trữ (localStorage)
    let stars = parseInt(localStorage.getItem('userStars')) || 0;
    stars += 1;
    localStorage.setItem('userStars', stars);

    // 2. Cập nhật con số hiển thị trên màn hình ngay lập tức
    const starElement = document.getElementById('star-count');
    if (starElement) {
        starElement.innerText = stars;
    }

    // 3. Ẩn bảng thông báo
    document.getElementById('feedback-overlay').classList.add('hidden');

    // 4. KIỂM TRA CHUYỂN CÂU
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        // Hết câu thì về trang kết quả (Dùng stars thay cho currentScore để đồng bộ tổng sao)
        window.location.href = "result.html?score=" + stars + "&type=quiz";
    }
}

// =======================
// 6. ĐÓNG FAIL
// =======================
function closeFailOverlay() {
    document.getElementById('fail-overlay').classList.add('hidden');
    document.querySelectorAll('.quiz-bubble').forEach(btn => {
        btn.classList.remove('wrong-shake');
    });
}

// =======================
// 7. ÂM THANH
// =======================
function playQuizAudio() {
    const currentQuiz = quizData[currentIndex];
    const audio = document.getElementById("audio-player");
    audio.src = currentQuiz.sound;
    audio.load();
    audio.play().catch(err => console.error("Lỗi âm thanh:", err));
}

// =======================
// 8. KHỞI CHẠY (CẬP NHẬT: HIỆN SAO KHI VỪA VÀO)
// =======================
window.onload = function() {
    // Hiện số sao cũ bé đang có
    const savedStars = localStorage.getItem('userStars') || 0;
    const starElement = document.getElementById('star-count');
    if (starElement) {
        starElement.innerText = savedStars;
    }
    loadQuestion();
};