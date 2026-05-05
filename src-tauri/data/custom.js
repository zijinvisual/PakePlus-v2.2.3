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

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
{
  "permissions": [
    "dialog:allow-open",
    "dialog:allow-save",
    "fs:allow-read-files",
    "fs:allow-read-dir"
  ]
}
// 跳转到系统文件管理器（Android）
function openSystemFileManager() {
  const intent = new window.__TAURI__.android.Intent();
  intent.setAction('android.intent.action.VIEW');
  intent.setDataAndType(
    window.__TAURI__.android.Uri.parse('content://com.android.externalstorage.documents/root/'),
    'vnd.android.document/root'
  );
  intent.addFlags(0x10000000); // FLAG_ACTIVITY_NEW_TASK
  window.__TAURI__.android.startActivity(intent);
}
if (window.__TAURI__.android) {
  const Settings = window.__TAURI__.android.importClass('android.provider.Settings');
  const Uri = window.__TAURI__.android.importClass('android.net.Uri');
  const intent = new window.__TAURI__.android.Intent(
    Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION,
    Uri.parse('package:' + window.__TAURI__.android.getPackageName())
  );
  window.__TAURI__.android.startActivity(intent);
}
// 给 WebView 加上文件选择回调
(function() {
    // 监听 input[type=file]
    document.addEventListener('click', function(e) {
        var target = e.target;
        if (target.tagName === 'INPUT' && target.type === 'file') {
            // 通知原生层打开文件选择器
            window.PakePlus && window.PakePlus.openFileChooser();
        }
    }, true);
})();

document.addEventListener('click', function(e){
  let el = e.target;
  if(el.tagName === 'INPUT' && el.type === 'file'){
    if(window.PakePlus) {
      window.PakePlus.openFileChooser();
    }
  }
}, true);

document.addEventListener('click', function(e){
  let a = e.target.closest('a[download]');
  if(a){
    e.preventDefault();
    if(window.PakePlus){
      window.PakePlus.downloadFile(a.href, a.download);
    }
  }
});

// 解决文件导入问题
document.addEventListener('click', function(e) {
    const target = e.target;
    if (target.tagName === 'INPUT' && target.type === 'file') {
        if (window.PakePlus && window.PakePlus.openFileChooser) {
            e.preventDefault();
            window.PakePlus.openFileChooser();
        }
    }
}, true);

// （可选）同时解决文件导出/下载问题
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[download]');
    if (link) {
        e.preventDefault();
        if (window.PakePlus && window.PakePlus.downloadFile) {
            window.PakePlus.downloadFile(link.href, link.download);
        }
    }
});