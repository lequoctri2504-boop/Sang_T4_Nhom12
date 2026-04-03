const historyData = [
    { name: "Minh Anh", id: "BE1024", score: "24 / 25", progress: 96, date: "15/05/2024", time: "14:30", color: "bg-amber-100 text-amber-600" },
    { name: "Bảo Nam", id: "BE1025", score: "18 / 25", progress: 72, date: "15/05/2024", time: "10:15", color: "bg-pink-100 text-pink-600" },
    { name: "Linh Chi", id: "BE1026", score: "22 / 25", progress: 88, date: "14/05/2024", time: "19:45", color: "bg-blue-100 text-blue-600" }
];

function renderHistory() {
    const tbody = document.getElementById('log-table-body');
    tbody.innerHTML = historyData.map(item => `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="py-6">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center font-black ${item.color}">${item.name.charAt(0)}</div>
                    <div>
                        <div class="font-black text-slate-800">${item.name}</div>
                        <div class="text-[10px] text-slate-400 font-bold">ID: ${item.id}</div>
                    </div>
                </div>
            </td>
            <td class="py-6 text-center">
                <span class="text-xl font-black text-[#04647d]">${item.score.split('/')[0]}</span>
                <span class="text-slate-300 font-bold"> / ${item.score.split('/')[1]}</span>
            </td>
            <td class="py-6 w-48">
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="bg-[#04647d] h-full" style="width: ${item.progress}%"></div>
                </div>
            </td>
            <td class="py-6">
                <div class="font-bold text-slate-700 text-sm">${item.date}</div>
                <div class="text-[10px] text-slate-400 font-bold">Lúc ${item.time}</div>
            </td>
            <td class="py-6 text-right">
                <span class="material-symbols-outlined text-slate-200">chevron_right</span>
            </td>
        </tr>
    `).join('');
}

window.onload = renderHistory;