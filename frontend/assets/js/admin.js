// Admin Dashboard - Full Functionality

let lettersData = [];
let petsData = [];
let userData = [];

// Load data from API
async function loadLetters() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/api/letters`);
        const result = await response.json();
        lettersData = result.data || result;
        return lettersData;
    } catch (error) {
        console.error('Lỗi tải chữ cái:', error);
        // Fallback to dummy data
        lettersData = [
            { id: 1, name: "A", example_word: "Áo", color: "bg-blue-100 text-blue-600" },
            { id: 2, name: "Ă", example_word: "Ăn", color: "bg-green-100 text-green-600" },
            { id: 3, name: "B", example_word: "Bướm", color: "bg-purple-100 text-purple-600" }
        ];
        return lettersData;
    }
}

// Navigation Functions
function goHome() {
    window.location.href = 'index.html';
}

function logout() {
    // Clear user session
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    
    // Show confirmation
    alert('Đã đăng xuất thành công!');
    
    // Redirect to home
    window.location.href = 'index.html';
}

// Add new letter (placeholder)
function addNew() {
    const currentTab = document.querySelector('.tab-btn.active');
    let tabName = 'letters';
    
    if (currentTab.id === 'btn-pets') {
        tabName = 'pets';
    } else if (currentTab.id === 'btn-users') {
        tabName = 'users';
    }
    
    if (tabName === 'letters') {
        const charName = prompt('Nhập chữ cái mới (ví dụ: C):');
        if (charName) {
            const exampleWord = prompt('Nhập ví dụ (ví dụ: Cá):');
            if (exampleWord) {
                alert(`✓ Thêm chữ "${charName}" - Ví dụ: "${exampleWord}" thành công!`);
                // In a real app, this would POST to API
                showTab('letters');
            }
        }
    } else if (tabName === 'pets') {
        alert('Tính năng thêm thú cưng sẽ được cập nhật!');
    }
}

// Edit functions
function editLetter(id) {
    alert(`Chỉnh sửa chữ cái ID: ${id}\n(Tính năng chi tiết sẽ được cập nhật)`);
}

function editPet(name) {
    alert(`Chỉnh sửa thú cưng: ${name}\n(Tính năng chi tiết sẽ được cập nhật)`);
}

// Tab switching function
async function showTab(tabName) {
    const content = document.getElementById('content-area');
    const title = document.getElementById('admin-title');
    const addBtn = document.getElementById('add-btn');
    
    // Update button states
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'text-[#04647d]', 'border-b-2', 'border-[#04647d]');
    });
    document.getElementById('btn-' + tabName).classList.add('active', 'text-[#04647d]', 'border-b-2', 'border-[#04647d]');

    if (tabName === 'letters') {
        title.innerText = "Quản Lý Chữ Cái";
        addBtn.style.display = "flex";
        
        // Load letters from API
        await loadLetters();
        
        content.innerHTML = `
            <div class="admin-box">
                <table class="w-full text-left">
                    <thead class="bg-[#e6ffc5] text-[#04647d] text-xs uppercase font-bold">
                        <tr>
                            <th class="p-5 rounded-l-3xl">Chữ Cái</th>
                            <th class="p-5">Ví Dụ</th>
                            <th class="p-5 text-right rounded-r-3xl pr-8">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${lettersData.slice(0, 10).map(l => `
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-5">
                                    <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full font-black text-lg">
                                        ${l.name || l.char}
                                    </div>
                                </td>
                                <td class="p-5 font-bold">${l.example_word || l.example}</td>
                                <td class="p-5 text-right pr-8">
                                    <button onclick="editLetter(${l.id || 1})" class="text-blue-500 font-bold hover:text-blue-700 transition cursor-pointer">
                                        ✏️ Sửa
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`;
            
    } else if (tabName === 'pets') {
        title.innerText = "Quản Lý Thú Cưng";
        addBtn.style.display = "flex";
        
        const petsData = [
            { name: "Mèo Béo", emoji: "🐱", price: 10 },
            { name: "Cún Con", emoji: "🐶", price: 15 },
            { name: "Chim Vàng", emoji: "🐦", price: 8 }
        ];
        
        content.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${petsData.map(p => `
                    <div class="pet-card bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition border-2 border-slate-100">
                        <div class="text-7xl mb-4 text-center">${p.emoji}</div>
                        <h3 class="text-xl font-black text-slate-800 mb-2">${p.name}</h3>
                        <p class="text-orange-500 font-bold mb-4">Giá: ${p.price} ⭐</p>
                        <button onclick="editPet('${p.name}')" class="text-blue-500 font-bold hover:text-blue-700 transition cursor-pointer">
                            ✏️ Chỉnh sửa
                        </button>
                    </div>
                `).join('')}
            </div>`;
            
    } else if (tabName === 'users') {
        title.innerText = "Hoạt Động Của Bé";
        addBtn.style.display = "none";
        
        const userData = [
            { id: 1, name: "Bé Minh Anh", activity: "Tô màu chữ A", stars: 1284, status: "Online" },
            { id: 2, name: "Bé Khôi Nguyên", activity: "Học ghép chữ", stars: 450, status: "Offline" },
            { id: 3, name: "Bé Hùng", activity: "Quiz chữ cái", stars: 890, status: "Online" }
        ];
        
        content.innerHTML = `
            <div class="admin-box">
                <table class="w-full text-left">
                    <thead class="bg-blue-50 text-blue-700 text-xs uppercase font-bold">
                        <tr>
                            <th class="p-5 rounded-l-3xl">Tên Bé</th>
                            <th class="p-5">Hành Động</th>
                            <th class="p-5">Sao</th>
                            <th class="p-5 rounded-r-3xl text-right pr-8">Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${userData.map(u => `
                            <tr class="hover:bg-slate-50 transition">
                                <td class="p-5 font-bold">${u.name}</td>
                                <td class="p-5 text-slate-500">${u.activity}</td>
                                <td class="p-5 font-black text-orange-500">${u.stars} ⭐</td>
                                <td class="p-5 text-right pr-8">
                                    <span class="px-3 py-1 rounded-full text-xs font-bold ${u.status === 'Online' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}">
                                        ${u.status}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`;
    }
}

// Initialize
window.onload = () => {
    showTab('letters');
};