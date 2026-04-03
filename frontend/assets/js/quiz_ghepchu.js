// 1. Dữ liệu 5 câu hỏi với các chữ cái khác nhau
const ghepChuData = [
    { target: "G", options: ["E", "G", "H", "I"], hint: "G" },
    { target: "M", options: ["M", "N", "O", "P"], hint: "M" },
    { target: "K", options: ["H", "K", "L", "T"], hint: "K" },
    { target: "R", options: ["R", "S", "U", "V"], hint: "R" },
    { target: "E", options: ["A", "E", "C", "D"], hint: "E" }
];

let currentLevel = 0;

// 2. Hàm khởi tạo câu hỏi
function loadLevel() {
    const data = ghepChuData[currentLevel];
    
    // Cập nhật tiêu đề và số câu
    document.getElementById('target-letter-name').innerText = data.target;
    document.getElementById('q-number').innerText = currentLevel + 1;

    // Cập nhật ô trống (bóng mờ)
    const dropZone = document.getElementById('drop-zone');
    dropZone.innerHTML = `<span class="text-[18rem] font-black letter-placeholder">${data.hint}</span>`;
    dropZone.className = "relative w-80 h-[26rem] bg-white border-dashed border-4 border-[#04647d]/30 rounded-[3rem] flex items-center justify-center shadow-xl transition-all";

    // Cập nhật các khối chữ để kéo
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = "";
    
    data.options.forEach(letter => {
        const div = document.createElement('div');
        div.id = letter;
        div.draggable = true;
        div.ondragstart = drag;
        div.className = "quiz-bubble w-28 h-28 rounded-2xl flex items-center justify-center text-5xl font-black shadow-md cursor-pointer";
        
        // Đổ màu ngẫu nhiên cho sinh động
        const colors = ['bg-[#ffc2ca] text-[#834b55]', 'bg-[#9ae1ff] text-[#04647d]', 'bg-[#feda57] text-[#6e5a00]', 'bg-[#c5e4ff] text-[#2d5a88]'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        div.className += " " + randomColor;
        
        div.innerText = letter;
        optionsContainer.appendChild(div);
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const targetLetter = ghepChuData[currentLevel].target;
    const draggedElement = document.getElementById(data);
    const dropZone = document.getElementById('drop-zone');

    if (data === targetLetter) {
        dropZone.innerHTML = `<span class="text-[18rem] font-black text-[#7bbf22] animate-popIn">${data}</span>`;
        dropZone.classList.remove('border-dashed', 'border-[#04647d]/30');
        dropZone.classList.add('bg-green-50', 'border-solid', 'border-[#7bbf22]', 'correct-shake-glow');

        setTimeout(() => {
            document.getElementById('feedback-overlay').classList.remove('hidden');
        }, 600);
    } else {
        draggedElement.classList.add('wrong-shake');
        setTimeout(() => {
            document.getElementById('fail-overlay').classList.remove('hidden');
        }, 400);
    }
}

// ... Giữ nguyên các phần 1, 2, 3, 4 bên trên của Hân ...

function nextStep() {
    // 1. Cộng 1 sao vào kho lưu trữ
    let stars = parseInt(localStorage.getItem('userStars')) || 0;
    stars += 1;
    localStorage.setItem('userStars', stars);

    // 2. Cập nhật số sao đang hiện trên màn hình
    document.getElementById('star-count').innerText = stars;

    // 3. Đóng bảng thông báo
    document.getElementById('feedback-overlay').classList.add('hidden');

    // 4. CHỈNH LẠI: Logic chuyển câu phải nằm ở đây để chạy mỗi khi bấm nút
    if (currentLevel < ghepChuData.length - 1) {
        currentLevel++;
        loadLevel(); // Qua câu mới
    } else {
        // Nếu hết câu thì về trang kết quả
        window.location.href = "result.html?score=5&type=ghepchu"; 
    }
}

// 5. Hàm load sao khi vừa mở trang (Chỉ giữ lại phần hiện sao)
window.addEventListener('DOMContentLoaded', () => {
    const savedStars = localStorage.getItem('userStars') || 0;
    const starElement = document.getElementById('star-count');
    if (starElement) {
        starElement.innerText = savedStars;
    }
});

function closeFail() {
    document.getElementById('fail-overlay').classList.add('hidden');
    document.querySelectorAll('.quiz-bubble').forEach(btn => btn.classList.remove('wrong-shake'));
}

// Chạy lần đầu khi load trang
window.onload = loadLevel;

function closeFail() {
    document.getElementById('fail-overlay').classList.add('hidden');
    document.querySelectorAll('.quiz-bubble').forEach(btn => btn.classList.remove('wrong-shake'));
}

// Chạy lần đầu khi load trang
window.onload = loadLevel;