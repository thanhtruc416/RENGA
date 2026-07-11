// MediaPipe Hands là thư viện UMD cũ (gắn global window.Hands/window.Camera), không có
// bản ESM import được — phải nạp qua thẻ <script> động, giống hệt cách file demo gốc dùng.
let loadPromise: Promise<void> | null = null;

const SCRIPTS = [
  'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js',
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const el = document.createElement('script');
    el.src = src;
    el.crossOrigin = 'anonymous';
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Không tải được ${src}`));
    document.head.appendChild(el);
  });
}

export function loadMediaPipeScripts(): Promise<void> {
  if (!loadPromise) {
    loadPromise = SCRIPTS.reduce(
      (chain, src) => chain.then(() => loadScript(src)),
      Promise.resolve(),
    );
  }
  return loadPromise;
}
