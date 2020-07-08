self.addEventListener('install', event => {
  // console.log('Service worker installing...');
  // cache your resources here.
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // console.log('Service worker activating...');
});
