async function fetchLetters() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/api/letters`);
        if (!response.ok) throw new Error("Không thể kết nối API");
        return await response.json();
    } catch (error) {
        console.error("Lỗi fetchLetters:", error);
        return []; // Trả về mảng rỗng nếu lỗi để web không bị sập
    }
}


async function fetchLetterById(id) {
    try {
        const response = await fetch(`${CONFIG.API_URL}/api/letters/${id}`);
        if (!response.ok) throw new Error("Không tìm thấy chữ cái này");
        return await response.json();
    } catch (error) {
        console.error("Lỗi fetchLetterById:", error);
        return null;
    }
}