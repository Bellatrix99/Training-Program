// 先获取需要操作的元素
const homepodSection = document.querySelector('.homepod-section');

// 拿到整个 homepod 图片集合的高度
const sectionHeight = homepodSection.getBoundingClientRect().height;

const html = document.documentElement;

// 监听滚动事件, 为不同的部分设置对应的透明度
document.addEventListener('scroll', (e) => {
    // 计算出整个 homepod 集合滚动的程度(通过滚动距顶部的高度除以集合总高度减去视窗高度)
    // sectionHeight - html.clientHeight 即除去当前视窗剩下的 homepod 图片集合总高度
    let scrolled = html.scrollTop / (sectionHeight - html.clientHeight);

    homepodSection.style.setProperty('--part-1', calculateOpacity(0.05, 0.15, scrolled))
    homepodSection.style.setProperty('--part-2', calculateOpacity(0.19, 0.23, scrolled))
    homepodSection.style.setProperty('--part-3', calculateOpacity(0.35, 0.40, scrolled))
    homepodSection.style.setProperty('--part-4', calculateOpacity(0.58, 0.63, scrolled))
    homepodSection.style.setProperty('--ending', calculateOpacity(0.80, 0.85, scrolled))
})

function calculateOpacity(start, end, percent) {
    // 如果比初始值小或者比终值大则分别返回透明度0/1
    if (percent - start < 0) return 0;
    if (percent - end > 0) return 1;

    // 否则返回当前滚动值占区间的比例
    return (percent - start) / (end - start);
}