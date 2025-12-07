self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => console.log("SW active"));

// Receive notification request from client (foreground)
self.addEventListener("message", (event) => {
    const { title, body } = event.data || {};
    if (!title) return;

    self.registration.showNotification(title, {
        body,
        icon: "/icons/android-chrome-192x192.png",
        vibrate: [100, 50, 100],
    });
});

// Push notifications (optional if you use Web Push)
self.addEventListener("push", (event) => {
    const data = event.data?.json() || {};
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "/icons/android-chrome-192x192.png",
        })
    );
});