// Centralized logging utility

function createLogger() {
  const isDebugEnabled = () => localStorage.getItem('debug') === 'true';

  return {
    debug: (...args) => {
      if (isDebugEnabled()) {
        console.log('[DEBUG]', ...args);
      }
    },
    info: (...args) => {
      if (isDebugEnabled()) {
        console.info('[INFO]', ...args);
      }
    },
    warn: (...args) => console.warn('[WARN]', ...args),
    error: (...args) => console.error('[ERROR]', ...args),
  };
}

export const logger = createLogger();
