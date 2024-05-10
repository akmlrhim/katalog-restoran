import "regenerator-runtime";
import CacheHelper from "./utils/cache-helper";

const assetsToCache = [
  "./",
  "./icon/icon-192x192.png",
  "./icon/icon-256x256.png",
  "./icon/icon-384x384.png",
  "./icon/icon-512x512.png",
  "./index.html",
  "./favicon.png",
  "./app.bundle.js",
  "./app.webmanifest",
  "./sw.bundle.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
