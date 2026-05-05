// Patch os.hostname() to return ASCII-safe name for Vercel CLI
const os = require('os');
const _hostname = os.hostname.bind(os);
os.hostname = () => {
  try {
    const h = _hostname();
    return h.replace(/[^\x00-\x7F]/g, '_');
  } catch (e) {
    return 'localhost';
  }
};
