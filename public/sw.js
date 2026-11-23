// Service worker de Niris: guarda archivos para cargar rápido y mostrar una página sin conexión.
const VERSION = "niris-v1";
const SCOPE = new URL(self.registration.scope).pathname; // "/" o "/nombre-del-repo/"
const OFFLINE = SCOPE + "offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll([OFFLINE])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Páginas: primero la red (contenido fresco); si no hay conexión, la copia guardada o la página sin conexión.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match(OFFLINE)))
    );
    return;
  }

  // Archivos estáticos (código, imágenes, fuentes): primero la copia guardada.
  if (/\/_next\/static\/|\/images\/|\/icons\/|\.(?:js|css|woff2|jpg|png|svg|webp)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(VERSION).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
  }
});
