import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function hmrWebSocketShimPlugin() {
  return {
    name: 'hmr-websocket-shim',
    enforce: 'pre' as const,
    transformIndexHtml: {
      order: 'pre' as const,
      handler() {
        return [
          {
            tag: 'script',
            attrs: { type: 'text/javascript' },
            injectTo: 'head-prepend' as const,
            children: `
              (function() {
                if (typeof window === 'undefined') return;
                var NativeWebSocket = window.WebSocket;

                function SafeViteWebSocket(url, protocols) {
                  var self = this;
                  this.url = String(url || '');
                  this.protocol = String(protocols || '');
                  this.readyState = 1; // WebSocket.OPEN
                  this.OPEN = 1;
                  this.CONNECTING = 0;
                  this.CLOSING = 2;
                  this.CLOSED = 3;
                  this.bufferedAmount = 0;
                  this.extensions = '';
                  this.binaryType = 'blob';
                  this.onopen = null;
                  this.onclose = null;
                  this.onerror = null;
                  this.onmessage = null;
                  this._listeners = {};

                  this.addEventListener = function(event, callback, options) {
                    if (!self._listeners[event]) self._listeners[event] = [];
                    var entry = { callback: callback, once: !!(options && options.once) };
                    self._listeners[event].push(entry);
                    if (event === 'open') {
                      setTimeout(function() {
                        try { callback.call(self, { type: 'open', target: self }); } catch(e) {}
                      }, 0);
                    }
                  };

                  this.removeEventListener = function(event, callback) {
                    if (!self._listeners[event]) return;
                    self._listeners[event] = self._listeners[event].filter(function(item) {
                      return item.callback !== callback;
                    });
                  };

                  this.dispatchEvent = function(event) {
                    var list = (self._listeners[event.type] || []).slice();
                    for (var i = 0; i < list.length; i++) {
                      try { list[i].callback.call(self, event); } catch(e) {}
                      if (list[i].once) {
                        self.removeEventListener(event.type, list[i].callback);
                      }
                    }
                    return true;
                  };

                  this.send = function() {};
                  this.close = function(code, reason) {
                    self.readyState = 3; // CLOSED
                    var evt = { type: 'close', wasClean: true, code: code || 1000, reason: reason || '', target: self };
                    if (self.onclose) {
                      try { self.onclose.call(self, evt); } catch(e) {}
                    }
                    self.dispatchEvent(evt);
                  };

                  setTimeout(function() {
                    if (self.onopen) {
                      try { self.onopen.call(self, { type: 'open', target: self }); } catch(e) {}
                    }
                  }, 0);
                }

                SafeViteWebSocket.CONNECTING = 0;
                SafeViteWebSocket.OPEN = 1;
                SafeViteWebSocket.CLOSING = 2;
                SafeViteWebSocket.CLOSED = 3;
                SafeViteWebSocket.prototype.CONNECTING = 0;
                SafeViteWebSocket.prototype.OPEN = 1;
                SafeViteWebSocket.prototype.CLOSING = 2;
                SafeViteWebSocket.prototype.CLOSED = 3;

                window.WebSocket = SafeViteWebSocket;

                var origError = console.error;
                console.error = function() {
                  for (var i = 0; i < arguments.length; i++) {
                    var a = arguments[i];
                    var str = (a && (a.message || a.stack || String(a))) || '';
                    if (str.indexOf('WebSocket closed without opened') !== -1 || str.indexOf('[vite] failed to connect to websocket') !== -1) {
                      return;
                    }
                  }
                  origError.apply(console, arguments);
                };

                window.addEventListener('unhandledrejection', function(event) {
                  var reason = event && event.reason;
                  var msg = (reason && (reason.message || reason.stack || String(reason))) || '';
                  if (msg.indexOf('WebSocket closed without opened') !== -1) {
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    if (event.preventDefault) event.preventDefault();
                  }
                }, true);
              })();
            `,
          },
        ];
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      hmrWebSocketShimPlugin(),
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.png', 'apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: '/',
          name: 'Diran Peak Adventure - Pakistan Treks & Expeditions',
          short_name: 'Diran Peak',
          description: 'Premier trekking and mountaineering expeditions in the Karakoram, Himalayas, and Hindu Kush mountain ranges in Pakistan.',
          theme_color: '#1a2b48',
          background_color: '#1a2b48',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          categories: ['travel', 'sports', 'lifestyle'],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,jpg,jpeg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio environment to prevent connection errors
      hmr: false,
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
