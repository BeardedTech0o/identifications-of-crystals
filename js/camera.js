/* Camera capture helper: wraps getUserMedia + a capture-to-canvas step. */
const Camera = (() => {
  let stream = null;

  async function start(videoEl, { facingMode = 'environment' } = {}) {
    stop();
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 1280 } },
      audio: false
    });
    videoEl.srcObject = stream;
    await videoEl.play();
  }

  function stop() {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
  }

  function captureToCanvas(videoEl, canvasEl) {
    const size = Math.min(videoEl.videoWidth, videoEl.videoHeight) || 720;
    canvasEl.width = size;
    canvasEl.height = size;
    const ctx = canvasEl.getContext('2d');
    const sx = (videoEl.videoWidth - size) / 2;
    const sy = (videoEl.videoHeight - size) / 2;
    ctx.drawImage(videoEl, sx, sy, size, size, 0, 0, size, size);
    return canvasEl;
  }

  return { start, stop, captureToCanvas };
})();
