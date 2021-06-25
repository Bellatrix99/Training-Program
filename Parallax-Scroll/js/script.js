// 元素变量
const $body = document.body;
const $navMenu = document.querySelector('.nav-menu');
const $scrollTop = document.querySelectorAll('.scrollTop');
const $skills = document.querySelector('#skills');
const $progressBar = document.querySelectorAll('#skills .progress-bar');
const $animated = document.querySelectorAll('.animated');
const $profiles = document.querySelector('#profiles');
const $headerElem = document.querySelector('#header-ele');

// 设置显示 skill 模块的 Boolean 值
let showSkill = false;

// 为 nav 栏中的几个选项添加事件委托
$navMenu.addEventListener('click', (event) => {
    let $target = event.target;
    // 如果点击的元素不属于 html 则跳过
    if (!($target instanceof HTMLElement)) {
        return;
    }
    // 如果点击的 tag 不是超链接 A (tagName 一定是大写的) 则跳过
    if ($target.tagName !== 'A') {
        return;
    }
    // 给点击的 target 元素添加 active 类
    $target.classList.add('active');
    // 拿到当前 target 元素的 href 特性值
    let targetElem = $target.getAttribute('href');
    // 通过该特性值得到对应跳转的 targetElem
    const $targetElem = document.querySelector(targetElem);
    // 将整个 body 滚动到 targetElem
    $body.scrollTop = $targetElem.offsetTop;
});

// 为 scroll 添加事件监听
window.addEventListener('scroll', () => {
    // 拿到当前 window 的 scrollY 和 innerHeight
    let scrollPos = window.scrollY;
    let windowHeight = window.innerHeight;
    // 循环操作带有 scrollTop 类的元素
    for (let $scrollTopElement of $scrollTop) {
        // 拿到当前 target 元素的 href 特性值
        let target = $scrollTopElement.getAttribute('href');
        // 通过该特性值得到对应跳转的 targetElem
        const $targetElem = document.querySelector(target);
        let targetPos = $targetElem.offsetTop - 50;
        // 得到当前元素的 offsetHeight 偏移量
        let targetHeight = $targetElem.offsetHeight;
        // 如果这个偏移量小于当前窗口的 scrollY, 并且当前元素最下方超过了 scrollY
        if (targetPos <= scrollPos + windowHeight / 2 && (targetPos + targetHeight) > scrollPos + windowHeight / 2) {
            // 则给当前元素增加一个 active 类
            $scrollTopElement.classList.add('active');
        } else {
            // 反之则去除 active 类
            $scrollTopElement.classList.remove('active');
        }
    }

    // 拿到 $skills 元素的顶部偏移
    let skillTop = $skills.offsetTop;

    // 如果 $skills 顶部偏移小于窗口中间位置顶部偏移,并且 showSkill 为假
    if (skillTop <= (scrollPos + windowHeight / 2) && !showSkill) {
        showSkill = true;
        // 循环所有的分数条, 为所有分数条设置宽度
        for (let $progressBarElement of $progressBar) {
            let progressValue = $progressBarElement.dataset.progress;
            $progressBarElement.style.width = progressValue + '%';
        }
    }

    // 循环所有有动画的元素
    for (let $animatedElement of $animated) {
        // 有动画元素的相对于上一个非默认定位的父元素的顶部偏移
        let animatedPos = $animatedElement.offsetTop;
        // 有动画元素的上一个非默认定位的父元素
        let parent = $animatedElement.offsetParent;
        animatedPos += parent.offsetTop;
        // 循环取得每一个非默认定位的父元素的偏移值并相加
        if (parent.offsetParent) {
            animatedPos += parent.offsetParent.offsetTop;
        }
        // 如果窗口底部的偏移值大于等于有动画元素的顶部偏移
        if ((windowHeight + scrollPos) >= animatedPos) {
            // 则给有动画元素新增一个 fadeIn 动画
            $animatedElement.classList.add('fadeIn');
        }
    }

    // 设置顶部和底部的视差动画
    // $headerElem.style.transform = "translateY:" + (scrollPos / 2) + "px";
    // 设置顶部的人像有一个视差移动, 使得人像移动距离是整体滚动距离的一半
    $headerElem.setAttribute('style', `transform:translateY(` + scrollPos / 2 + `px)`);
    // 设置底部的图片有一个视差移动, 使得图片向上移动距离为 |滚动距离的一半|
    $profiles.style.backgroundPositionY = -(scrollPos / 2) + 'px';
})