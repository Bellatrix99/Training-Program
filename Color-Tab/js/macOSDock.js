document.querySelectorAll('.dock li').forEach(li => {
    li.addEventListener('click',evt => {
        evt.currentTarget.classList.add('loading');
    })

    li.addEventListener('mousemove', e => {
        let item = e.target;
        let itemRect = item.getBoundingClientRect();
        let offset = Math.abs(e.clientX - itemRect.left) / itemRect.width;

        let prev = item.previousElementSibling || null;
        let next = item.nextElementSibling || null;

        let scale = 0.6;

        resetScale();

        if (prev) {
            prev.style.setProperty('--scale', (1 + scale * Math.abs(offset - 1)).toString());
        }

        item.style.setProperty('--scale', (1 + scale).toString())

        if (next) {
            next.style.setProperty('--scale', (1 + scale * offset).toString());
        }
    })
})

document.querySelector('.dock').addEventListener('mouseleave', evt => {
    resetScale();
})

function resetScale() {
    document.querySelectorAll('.dock li').forEach(li => {
        li.style.setProperty('--scale', (1).toString());
    })
}