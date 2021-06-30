// 是否可以移动的状态量
let shouldMove = false

// 使用到的元素
const captcha = document.querySelector('#captcha')
const handle = document.querySelector('#handle')
const button = document.querySelector('#handle span')

// 按下滑块的时候, 滑块设置可移动状态量为 true
button.addEventListener('mousedown', (e) => {
    shouldMove = true
})

window.addEventListener('mousemove', (e) => {
    if (shouldMove) {
        const offsetLeft = handle.getBoundingClientRect().left
        const buttonWidth = button.getBoundingClientRect().width

        // 将滑块移动的位移设置为滑块的中心点
        captcha.style.setProperty('--moved', `${e.clientX - offsetLeft - buttonWidth / 2}px`)
    }
})

window.addEventListener('mouseup', (e) => {
    if (shouldMove) {
        const finalOffset = e.clientX - handle.getBoundingClientRect().left

        // 如果最终偏移位置在 430-450 之间, 则认为验证码验证成功
        if (finalOffset >= 430 && finalOffset <= 450) {
            // 添加类 passed 表示验证通过
            captcha.classList.add('passed')
        } else {
            // 回到起点
            captcha.style.setProperty('--moved', '0px')
        }

        // 结束移动
        shouldMove = false
    }
})