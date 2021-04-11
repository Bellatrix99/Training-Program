// $(document).ready(function () {

// // Variables
// let clickedTab = $(".tabs > .active");
// let tabWrapper = $(".tab__content");
// let activeTab = tabWrapper.find(".active");
// let activeTabHeight = activeTab.outerHeight();
//
// // Show tab on page load
// activeTab.show();
//
// // Set height of wrapper on page load
// tabWrapper.height(activeTabHeight);
//
// // Variables
// let colorButton = $(".colors li");

// colorButton.on("click", function () {
//
//     // Remove class from currently active button
//     $(".colors > li").removeClass("active-color");
//
//     // Add class active to clicked button
//     $(this).addClass("active-color");
//
//     // Get background color of clicked
//     let newColor = $(this).attr("data-color");
//
//     // Change background of everything with class .bg-color
//     $(".bg-color").css("background-color", newColor);
//
//     // Change color of everything with class .text-color
//     $(".text-color").css("color", newColor);
// });
// });

// 元素变量
const $tab = document.querySelector(".tabs");
let tabLis = $tab.querySelectorAll("li");
let clickedTab = document.querySelector(".tabs > .active");
let tabWrapper = document.querySelector(".tab__content");
let contentLis = document.querySelectorAll(".tab__content > li");
let colorContainer = document.querySelector(".content__wrapper");
let colorButton = document.querySelector(".colors");
let colorButtonLi = document.querySelectorAll(".colors > li");

// 先将第一个 tab 显示
tabWrapper.children[0].style.display = "list-item";

// 为颜色切换的几个按钮添加事件委托
colorButton.addEventListener("click", function (event) {
    let $target = event.target;
    // 如果点击的元素不属于 html 则跳过
    if (!($target instanceof HTMLElement)) {
        return;
    }
    // const $realButton = $target.closest('li');
    // if ($target)
    // 先将所有的颜色选中（active-color）去除
    for (let colorButtonLiElement of colorButtonLi) {
        colorButtonLiElement.classList.remove("active-color");
    }

    // 为选中的颜色添加 active-color 突出显示
    $target.classList.add("active-color");

    let newColor = $target.getAttribute("data-color");

    let colorItems = document.querySelectorAll(".bg-color");

    // 为所有元素的背景颜色都换成 newColor
    for (let colorItem of colorItems) {
        colorItem.style.backgroundColor = newColor;
    }
})


// 为 $tab 添加事件委托，完成几个 tab 的切换功能
if ($tab instanceof HTMLElement) {
    $tab.addEventListener('click', (event) => {
        const $target = event.target;
        // 同样是判断元素是否附属 html
        if (!($target instanceof HTMLElement)) {
            return;
        }

        // 为每一个 tab 进行去除 active 选中，并且先隐藏所有
        for (let i = 0; i < tabLis.length; i++) {
            tabLis[i].classList.remove("active");
            contentLis[i].classList.remove("active");
            contentLis[i].style.display = "none";
        }

        // 找到点击处最近的 li 并为它设为选中 active
        const $realLi = $target.closest('li');
        $realLi.classList.add("active");

        // 根据左侧 tab 的选择来设置右侧的内容是否选中和显示
        contentLis[getActiveLi()].classList.add("active");
        contentLis[getActiveLi()].style.display = "list-item";
        // window.history.replaceState({},'','page'+ getActiveLi());
    })
}

// 得到左侧 tab 选中的序号
function getActiveLi() {
    for (let i = 0; i < tabLis.length; i++) {
        if (tabLis[i].classList.contains('active')) {
            return i;
        }
    }
}

