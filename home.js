const modal = document.getElementById("reviewModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".close-btn");

openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Обробка форми
const reviewForm = document.getElementById("reviewForm");
reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Дякуємо за ваш відгук!");
    modal.style.display = "none";
    reviewForm.reset();
});
