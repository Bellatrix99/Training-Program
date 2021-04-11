// let clickedTab = document.querySelector(".tabs > .active");
// let tabWrapper = document.querySelector(".tabContent");
// let activeTab = document.querySelector(".tabContent > .active");
// let li1 = document.querySelector(".tabContent li");

$(document).ready(function () {

    // Variables
    let clickedTab = $(".tabs > .active");
    let tabWrapper = $(".tab__content");
    let activeTab = tabWrapper.find(".active");
    let activeTabHeight = activeTab.outerHeight();

    // Show tab on page load
    activeTab.show();

    // Set height of wrapper on page load
    tabWrapper.height(activeTabHeight);

    // Variables
    let colorButton = $(".colors li");

    colorButton.on("click", function () {

        // Remove class from currently active button
        $(".colors > li").removeClass("active-color");

        // Add class active to clicked button
        $(this).addClass("active-color");

        // Get background color of clicked
        let newColor = $(this).attr("data-color");

        // Change background of everything with class .bg-color
        $(".bg-color").css("background-color", newColor);

        // Change color of everything with class .text-color
        $(".text-color").css("color", newColor);
    });
});


const $tab = document.querySelector('.tabs');
let tabLis = $tab.querySelectorAll('li');
let contentLis = document.querySelectorAll('.tab__content > li');
if ($tab instanceof HTMLElement) {
    $tab.addEventListener('click', (event) => {
        const $target = event.target;
        if (!($target instanceof HTMLElement)) {
            return;
        }
        const $realLi = $target.closest('li');

        for (let i = 0; i < tabLis.length; i++) {
            tabLis[i].classList.remove("active");
            contentLis[i].classList.remove("active");
            contentLis[i].style.display = "none";
        }
        $realLi.classList.add("active");
        contentLis[getActiveLi()].classList.add("active");
        contentLis[getActiveLi()].style.display = "list-item";
        window.history.replaceState({},'','page'+ getActiveLi());
    })
}

function getActiveLi() {
    for (let i = 0; i < tabLis.length; i++) {
        if (tabLis[i].classList.contains('active')) {
            return i;
        }
    }
}