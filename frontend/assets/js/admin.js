const lettersData = [
    { char: "A", example: "Con Cá", color: "bg-blue-100 text-blue-600" },
    { char: "B", example: "Con Bò", color: "bg-green-100 text-green-600" }
];

const petsData = [
    { name: "Mèo Béo", emoji: "🐱", price: 10 },
    { name: "Cún Con", emoji: "🐶", price: 15 }
];

const userData = [
    { name: "Bé Minh Anh", activity: "Tô màu chữ A", stars: 1284, status: "Online" },
    { name: "Bé Khôi Nguyên", activity: "Học ghép chữ", stars: 450, status: "Offline" }
];

function showTab(tabName) {
    const content = document.getElementById('content-area');
    const title = document.getElementById('admin-title');
    const addBtn = document.getElementById('add-btn');
    
    // Cập nhật trạng thái nút bấm
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active', 'text-[#04647d]', 'border-b-2', 'border-[#04647d]'));
    document.getElementById('btn-' + tabName).classList.add('active', 'text-[#04647d]', 'border-b-2', 'border-[#04647d]');

    if (tabName === 'letters') {
        title.innerText = "Quản Lý Chữ Cái";
        addBtn.style.display = "block";
        content.innerHTML = `
            <div class="admin-box">
                <table class="w-full text-left">
                    <thead class="bg-[#e6ffc5] text-[#04647d] text-xs uppercase">
                        <tr><th class="p-5 rounded-l-3xl">Chữ Cái</th><th class="p-5">Ví Dụ</th><th class="p-5 text-right rounded-r-3xl pr-8">Thao Tác</th></tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${lettersData.map(l => `<tr class="hover:bg-slate-50 transition"><td class="p-5"><div class="letter-badge ${l.color}">${l.char}</div></td><td class="p-5 font-bold">${l.example}</td><td class="p-5 text-right pr-8 text-blue-500 font-bold cursor-pointer">Sửa</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>`;
    } else if (tabName === 'pets') {
        title.innerText = "Quản Lý Thú Cưng";
        addBtn.style.display = "block";
        content.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${petsData.map(p => `<div class="pet-card"><div class="text-7xl mb-4">${p.emoji}</div><h3 class="text-xl font-black">${p.name}</h3><p class="text-orange-500 font-bold mb-4">Giá: ${p.price} ⭐</p><button class="text-blue-500 font-bold">Chỉnh sửa</button></div>`).join('')}</div>`;
    } else if (tabName === 'users') {
        title.innerText = "Hoạt Động Của Bé";
        addBtn.style.display = "none";
        content.innerHTML = `
            <div class="admin-box">
                <table class="w-full text-left">
                    <thead class="bg-blue-50 text-blue-700 text-xs uppercase">
                        <tr><th class="p-5 rounded-l-3xl">Tên Bé</th><th class="p-5">Hành Động</th><th class="p-5">Sao</th><th class="p-5 rounded-r-3xl text-right pr-8">Trạng Thái</th></tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${userData.map(u => `<tr><td class="p-5 font-bold">${u.name}</td><td class="p-5 text-slate-500">${u.activity}</td><td class="p-5 font-black text-orange-500">${u.stars} ⭐</td><td class="p-5 text-right pr-8"><span class="px-3 py-1 rounded-full text-xs font-bold ${u.status === 'Online' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}">${u.status}</span></td></tr>`).join('')}
                    </tbody>
                </table>
            </div>`;
    }
}

window.onload = () => showTab('letters');