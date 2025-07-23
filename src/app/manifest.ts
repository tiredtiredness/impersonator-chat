import {MetadataRoute} from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "Impersonator Chat",
    "short_name": "Impersonator",
    "icons": [
      {
        "src": "/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone",
    "start_url": "/"
  };
}