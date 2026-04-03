document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("letter-grid");

    try {
        const response = await fetch(`${CONFIG.API_URL}/api/letters`);
        const data = await response.json();

        data.forEach(letter => {
            const card = document.createElement("div");
            card.className = "col-6 col-md-3 col-lg-2";
            card.innerHTML = `
                <a href="detail.html?id=${letter.id}" class="text-decoration-none">
                    <div class="card letter-card p-3 border-0 shadow-sm">
                        <img src="${CONFIG.API_URL}/storage/letters/${letter.image}" class="card-img-top" alt="${letter.name}">
                        <div class="card-body">
                            <h5 class="card-title text-dark">${letter.name}</h5>
                        </div>
                    </div>
                </a>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Lỗi:", error);
    }
});