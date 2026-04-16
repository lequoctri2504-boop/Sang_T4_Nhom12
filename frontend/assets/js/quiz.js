// =======================
// 0. AUDIO MAP - TẤT CẢ 29 CHỮ CÁI
// =======================
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

// =======================
// 1. BIẾN
// =======================
let quizData = [];
let currentScore = 0;
let currentIndex = 0;
let userId = null;

// =======================
// 2. INIT - FETCH TỪ API
// =======================
async function initQuiz() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/api/quizzes`);
        const result = await response.json();
        quizData = result.data || result;
        
        // Parse options từ API response
        quizData = quizData.map(quiz => {
            // Handle options - API returns array, but check if it's string
            let options = quiz.options;
            if (typeof options === 'string') {
                options = options.split(' ').filter(o => o.trim());
            }
            
            // Get audio file from letter object
            let audioFile = null;
            if (quiz.letter) {
                // Try to get audio filename from audio_url (e.g., "http://127.0.0.1:8000/storage/a.mp3" -> "a.mp3")
                if (quiz.letter.audio_url) {
                    audioFile = quiz.letter.audio_url.split('/').pop();
                } else if (quiz.letter.audio) {
                    audioFile = quiz.letter.audio;
                }
            }
            
            return {
                ...quiz,
                correct: quiz.correct_answer || quiz.correct,
                options: options,
                audioFile: audioFile
            };
        });
        
        // Get userId from localStorage
        userId = localStorage.getItem('userId');
        
        loadQuestion();
    } catch (error) {
        console.error("Lỗi fetch quizzes:", error);
        alert("Không thể tải được câu hỏi. Vui lòng refresh trang.");
    }
}

// =======================
// 3. LOAD CÂU HỎI
// =======================
function loadQuestion() {
    if (!quizData || quizData.length === 0) return;
    
    const currentQuiz = quizData[currentIndex];

    // Update current question number and total
    document.getElementById('q-number').innerText = `${currentIndex + 1}/${quizData.length}`;

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
// 5. NEXT - LƯU SCORE VÀO API
// =======================
async function nextQuestion() {
    // 1. Nếu hết câu thì lưu score vào database
    if (currentIndex >= quizData.length - 1) {
        try {
            const response = await fetch(`${CONFIG.API_URL}/api/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    stars: currentScore,
                    quiz_type: 'normal'
                })
            });
            
            if (response.ok) {
                console.log("Score saved to API");
            }
        } catch (error) {
            console.error("Lỗi lưu score:", error);
        }
        
        // 2. Chuyển tới trang kết quả
        window.location.href = `result.html?score=${currentScore}&type=quiz`;
    } else {
        // 3. Cộng 1 sao vào localStorage (backup)
        let stars = parseInt(localStorage.getItem('userStars')) || 0;
        stars += 1;
        localStorage.setItem('userStars', stars);

        // 4. Ẩn bảng thông báo
        document.getElementById('feedback-overlay').classList.add('hidden');

        // 5. Chuyển câu tiếp
        currentIndex++;
        currentScore++;
        loadQuestion();
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
// 7. ÂM THANH - FETCH BLOB METHOD
// =======================
async function playQuizAudio() {
    let audioFile = null;
    
    // If quiz data is loaded, use current quiz's audio
    if (quizData && quizData.length > 0) {
        const currentQuiz = quizData[currentIndex];
        audioFile = currentQuiz.audioFile;
    }
    
    // Fallback: if no audio file found, pick a random letter
    if (!audioFile) {
        const letters = Object.keys(audioMap);
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        audioFile = audioMap[randomLetter];
    }
    
    try {
        // Try to fetch from local assets first
        let response = await fetch(`assets/audio/${audioFile}`);
        
        // Fallback to backend if local fails
        if (!response.ok) {
            response = await fetch(`${CONFIG.API_URL}/storage/audio/${audioFile}`);
        }
        
        if (response.ok) {
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            
            const audio = document.getElementById("audio-player");
            audio.src = blobUrl;
            audio.play().catch(err => console.error("Lỗi âm thanh:", err));
        } else {
            console.error("Không tìm thấy file âm thanh:", audioFile);
        }
    } catch (error) {
        console.error("Lỗi fetch audio:", error);
    }
}

// =======================
// 8. KHỞI CHẠY - FETCH QUIZZES TỰ API
// =======================
window.onload = function() {
    // Hiện số sao cũ bé đang có
    const savedStars = localStorage.getItem('userStars') || 0;
    const starElement = document.getElementById('star-count');
    if (starElement) {
        starElement.innerText = savedStars;
    }
    initQuiz();
};