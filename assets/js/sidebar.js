document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".sidebar-toggle").addEventListener("click", function(event) {
        document.querySelector(".sidebar").classList.toggle("active");
    });
});