document.querySelectorAll(".resource-row")
.forEach(row => {

    row.addEventListener("click", () => {

        showDetail(row.dataset.id);

    });

});