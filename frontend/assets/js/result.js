document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const score = parseInt(urlParams.get('score')) || 0;
    const type = urlParams.get('type') || 'quiz'; // Nhận diện loại trò chơi để quay lại cho đúng
    
    // 1. Hiển thị số sao dựa trên điểm số (tối đa 5 sao)
    const stars = document.querySelectorAll('.star-glow');
    stars.forEach((star, index) => {
        if (index < score) {
            // Dùng 'inline-block' để transform (độ cong) có tác dụng
            star.style.display = 'inline-block'; 
            star.style.animationDelay = (index * 0.2) + 's';
            // Thêm class để kích hoạt hiệu ứng pop và các vị trí cong trong CSS
            star.classList.add('star-pop'); 
        } else {
            star.style.display = 'none';
        }
    });

    // 2. Thay đổi thông điệp khen ngợi bé
    const message = document.getElementById('result-message');
    if (score >= 4) {
        message.innerText = "Bé Giỏi Quá!";
    } else if (score >= 1) {
        message.innerText = "Bé Làm Tốt Lắm!";
    } else {
        message.innerText = "Bé Cố Gắng Nhé!";
    }

    // 3. Cấu hình nút CHƠI LẠI quay về đúng trò chơi vừa chơi
    const playAgainBtn = document.getElementById('play-again-btn');
    if (playAgainBtn) {
        if (type === 'ghepchu') {
            playAgainBtn.onclick = () => window.location.href = 'quiz_ghepchu.html';
        } else {
            playAgainBtn.onclick = () => window.location.href = 'quiz.html';
        }
    }
});