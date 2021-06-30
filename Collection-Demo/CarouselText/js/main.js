// 设置一个定时器，定时滚动文字
setInterval(() => {
    // 获取需要操作的 DOM 元素
    const show = document.querySelector('span[data-show]')
    // 没有下一个兄弟节点则回到第一个
    const next = show.nextElementSibling || document.querySelector('span:first-child')
    const up = document.querySelector('span[data-up]')

    // 如果有上一个元素, 为已经过去的元素删除 data-up 类
    if (up) {
        up.removeAttribute('data-up');
    }

    // 所以现在的元素也不再是 show 元素
    show.removeAttribute('data-show');
    // 而是滚动到上面, 变成了 up 元素
    show.setAttribute('data-up', '');
    // 而下一个元素,即变成了当前元素 show
    next.setAttribute('data-show', '');

}, 2000)