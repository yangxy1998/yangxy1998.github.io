var cacheName = 'bs-0-2-14';
var cacheFiles = [
    '/',
    './index.html',
    './bundle.js',
    './settings.js',
    './jquery.min.js',
    './nutui.css',
    './manifest.json',
    './img/book.png',
    './svg/book.svg',
    './svg/book-active.svg',
    './svg/calendar.svg',
    './svg/calendar-active.svg',
    './svg/clipboard.svg',
    './svg/clipboard-active.svg',
    './svg/sun.svg',
];

// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
    console.log('Service Worker 状态： install');
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});

// sw.js
self.addEventListener('fetch', function (e) {
    // 如果有cache则直接返回，否则通过fetch请求
    e.respondWith(
        caches.match(e.request).then(function (cache) {
            return cache || fetch(e.request);
        }).catch(function (err) {
            console.log(err);
            return fetch(e.request);
        })
    );
});

// sw.js
// 监听activate事件，激活后通过cache的key来判断是否更新cache中的静态资源
self.addEventListener('activate', function (e) {
    console.log('Service Worker 状态： activate');
    var cachePromise = caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        }));
    })
    e.waitUntil(cachePromise);
    return self.clients.claim();
});

