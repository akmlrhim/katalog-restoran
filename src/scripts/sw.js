/* eslint-disable comma-dangle */
import "regenerator-runtime";
import { precacheAndRoute } from "workbox-precaching";
import CacheHelper from "./utils/cache-helper";

self.addEventListener("install", (event) => {
  event.waitUntil(
    precacheAndRoute(self.__WB_MANIFEST).then(() => {
      console.log("Service Worker: Precaching completed");
      self.skipWaiting();
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
  console.log("Service Worker: Activated");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});

self.addEventListener("push", (event) => {
  console.log("Service Worker: Pushed");

  const dataJson = event.data.json();
  const notification = {
    title: dataJson.title,
    options: {
      body: dataJson.options.body,
      icon: dataJson.options.icon,
      image: dataJson.options.image,
    },
  };

  event.waitUntil(
    self.registration.showNotification(notification.title, notification.options)
  );
});

self.addEventListener("notificationclick", (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const chainPromise = async () => {
    console.log("Notification has been clicked");
    await self.clients.openWindow("https://www.dicoding.com/");
  };

  event.waitUntil(chainPromise());
});
