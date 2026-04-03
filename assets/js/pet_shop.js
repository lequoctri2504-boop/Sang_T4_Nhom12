const pets = [
    { id: 1, name: "Mèo Béo", emoji: "🐱", price: 5 },
    { id: 2, name: "Cún Con", emoji: "🐶", price: 10 },
    { id: 3, name: "Thỏ Trắng", emoji: "🐰", price: 15 },
    { id: 4, name: "Gấu Trúc", emoji: "🐼", price: 20 },
    { id: 5, name: "Khủng Long", emoji: "🦖", price: 30 },
    { id: 6, name: "Rồng Lửa", emoji: "🐲", price: 50 }
];

function loadShop() {
    // Lấy số sao hiện tại và danh sách thú đã sở hữu
    const userStars = parseInt(localStorage.getItem('userStars')) || 0;
    const ownedPets = JSON.parse(localStorage.getItem('ownedPets')) || [];
    
    document.getElementById('star-count').innerText = userStars;
    const petList = document.getElementById('pet-list');
    petList.innerHTML = "";

    pets.forEach(pet => {
        const isOwned = ownedPets.includes(pet.id);
        const canAfford = userStars >= pet.price;
        
        const card = document.createElement('div');
        card.className = `pet-card bg-white p-8 rounded-[3rem] shadow-xl flex flex-col items-center ${isOwned ? 'owned' : ''}`;
        
        card.innerHTML = `
            <div class="text-8xl mb-4 ${!isOwned && !canAfford ? 'locked' : ''}">${pet.emoji}</div>
            <h3 class="text-2xl font-black text-[#04647d] mb-2">${pet.name}</h3>
            <div class="flex items-center gap-2 mb-6">
                <span class="text-xl font-bold text-[#6e5a00]">⭐ ${pet.price} sao</span>
            </div>
            ${isOwned 
                ? '<span class="text-[#7bbf22] font-black text-xl italic underline">Bạn thân của bé ✅</span>' 
                : `<button onclick="buyPet(${pet.id}, ${pet.price}, '${pet.name}')" 
                    class="w-full py-3 rounded-2xl font-bold text-lg shadow-md transition-all ${canAfford ? 'bg-[#ff9933] text-white hover:bg-[#e68a00]' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}"
                    ${!canAfford ? 'disabled' : ''}>
                    ${canAfford ? 'Đổi sao ngay!' : 'Cố thêm tí nhé'}
                  </button>`
            }
        `;
        petList.appendChild(card);
    });
}

function buyPet(id, price, name) {
    let userStars = parseInt(localStorage.getItem('userStars')) || 0;
    let ownedPets = JSON.parse(localStorage.getItem('ownedPets')) || [];

    if (userStars >= price) {
        // Trừ sao và lưu lại
        userStars -= price;
        localStorage.setItem('userStars', userStars);
        
        // Lưu thú mới vào danh sách sở hữu
        ownedPets.push(id);
        localStorage.setItem('ownedPets', JSON.stringify(ownedPets));

        // Hiện overlay chúc mừng
        document.getElementById('success-msg').innerText = `Bé đã đưa bạn ${name} về nhà rồi!`;
        document.getElementById('success-overlay').classList.remove('hidden');
        
        loadShop(); // Cập nhật lại giao diện ngay lập tức
    }
}

function closeSuccess() {
    document.getElementById('success-overlay').classList.add('hidden');
}

// Chạy shop khi trang web được tải
window.onload = loadShop;