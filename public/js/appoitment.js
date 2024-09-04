// function toggleForm() {
//     var form = document.querySelector('.form');
//     if (form.style.display === "none") {
//         form.style.display = "block";
//     } else {
//         form.style.display = "none";
//     }
// }

window.onload = function () {
    // Initially hide the form when the page loads
    document.querySelector('.form').style.display = "none";
};

function toggleForm() {
    var form = document.querySelector('.form');
    if (form.style.display === "none") {
        form.style.display = "block";
        form.style.backgroundColor = "#00000";
        form.classList.toggle('active');
    } else {
        form.style.display = "none";
    }
}