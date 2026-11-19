const myModal = new bootstrap.Modal('#myModal', {
  keyboard: false
})
document.querySelector(".credits").addEventListener("click", () => {
    myModal.show();
})