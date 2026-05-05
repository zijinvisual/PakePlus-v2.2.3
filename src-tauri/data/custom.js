window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
// 1. 禁用右键菜单（含“另存为”）
document.addEventListener('contextmenu', e => e.preventDefault());

// 2. 禁用选中、复制
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());

// 3. 禁用 Ctrl+S、Ctrl+P、F12 等
document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (
    (e.ctrlKey || e.metaKey) && ['s','p','u'].includes(k) // Ctrl+S/P/U
    || k === 'f12' // F12
  ) {
    e.preventDefault();
    return false;
  }
});

// 4. 干扰“文件→另存为”（经典iframe陷阱）
(function(){
  const s = document.createElement('noscript');
  s.innerHTML = '<iframe src="*.htm" style="display:none"></iframe>';
  document.body.appendChild(s);
})();
window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
