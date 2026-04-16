document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("letter-grid");

    try {
        const response = await fetch(`${CONFIG.API_URL}/api/letters`);
        const result = await response.json();
        const data = result.data || result;

        data.forEach(letter => {
            const card = document.createElement("div");
            card.className = "col-6 col-md-3 col-lg-2";
            const imageHtml = letter.image_url ? `<img src="${letter.image_url}" class="card-img-top" alt="${letter.name}" style="max-height:100px;object-fit:contain;">` : `<div class="text-5xl text-center p-3">${letter.name}</div>`;
            card.innerHTML = `
                <a href="detail.html?id=${letter.id}" class="text-decoration-none">
                    <div class="card letter-card p-3 border-0 shadow-sm">
                        ${imageHtml}
                        <div class="card-body">
                            <h5 class="card-title text-dark">${letter.name} - ${letter.example_word}</h5>
                        </div>
                    </div>
                </a>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Lỗi:", error);
        grid.innerHTML = '<p class="text-danger">Lỗi tải danh sách chữ cái</p>';
    }
});