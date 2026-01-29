// Smooth scroll for anchor links

import { logger } from 'logger';

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
}

export function initNav() {
  logger.info('Navigation initialized');

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSmoothScroll);
  } else {
    setupSmoothScroll();
  }
}
