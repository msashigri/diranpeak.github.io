const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.resolve(__dirname, '../node_modules/vite/dist/client/client.mjs'),
  path.resolve(__dirname, '../node_modules/vite/dist/client/bundledDevClient.mjs')
];

targetFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Replace the rejection that throws "WebSocket closed without opened"
    if (content.includes('reject(/* @__PURE__ */ new Error("WebSocket closed without opened."));')) {
      content = content.replace(
        'reject(/* @__PURE__ */ new Error("WebSocket closed without opened."));',
        'resolve(); return;'
      );
      modified = true;
    } else if (content.includes('reject(new Error("WebSocket closed without opened."));')) {
      content = content.replace(
        'reject(new Error("WebSocket closed without opened."));',
        'resolve(); return;'
      );
      modified = true;
    }

    // 2. Mute the error log when fallback fails
    if (content.includes('console.error(`[vite] failed to connect to websocket.')) {
      content = content.replace(
        'console.error(`[vite] failed to connect to websocket.',
        '/* muted */ (`[vite] failed to connect to websocket.'
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Successfully patched: ${file}`);
    } else {
      console.log(`Already patched or pattern not found: ${file}`);
    }
  }
});
