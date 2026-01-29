// Command Palette

import { logger } from 'logger';

let commands = [];
let isOpen = false;
let selectedIndex = 0;
let filteredCommands = [];
let previousActiveElement = null;

function createPalette() {
    const overlay = document.createElement('div');
    overlay.className = 'cmd-palette-overlay';
    overlay.id = 'cmd-palette-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'cmd-palette-title');

    const palette = document.createElement('div');
    palette.className = 'cmd-palette';
    palette.id = 'cmd-palette';

    const title = document.createElement('h2');
    title.id = 'cmd-palette-title';
    title.className = 'visually-hidden';
    title.textContent = 'Command Palette';
    palette.appendChild(title);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cmd-palette-input';
    input.id = 'cmd-palette-input';
    input.placeholder = 'Type to search...';
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-label', 'Search commands');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'true');
    input.setAttribute('aria-controls', 'cmd-palette-results');
    input.setAttribute('aria-activedescendant', '');

    const results = document.createElement('div');
    results.className = 'cmd-palette-results';
    results.id = 'cmd-palette-results';
    results.setAttribute('role', 'listbox');
    results.setAttribute('aria-label', 'Command results');

    const liveRegion = document.createElement('div');
    liveRegion.className = 'visually-hidden';
    liveRegion.id = 'cmd-palette-live';
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');

    palette.appendChild(input);
    palette.appendChild(results);
    palette.appendChild(liveRegion);
    overlay.appendChild(palette);
    document.body.appendChild(overlay);

  return { overlay, input, results, liveRegion };
}

function announceResults() {
    const liveRegion = document.getElementById('cmd-palette-live');
    if (!liveRegion) return;

    const count = filteredCommands.length;
    liveRegion.textContent = count === 0
      ? 'No results found'
      : `${count} result${count === 1 ? '' : 's'} available`;
}

function renderResults(results) {
    filteredCommands = commands.filter(cmd => {
      const query = results.parentElement.querySelector('.cmd-palette-input').value.toLowerCase();
      if (!query) return true;
      return cmd.label.toLowerCase().includes(query) ||
             cmd.keywords.toLowerCase().includes(query);
    });

    results.innerHTML = '';

    if (filteredCommands.length === 0) {
      results.innerHTML = '<div class="cmd-palette-no-results" role="status">No results found</div>';
      announceResults();
      return;
    }

    filteredCommands.forEach((cmd, index) => {
      const item = document.createElement('div');
      item.className = 'cmd-palette-item';
      item.id = `cmd-option-${index}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', index === selectedIndex ? 'true' : 'false');

      if (index === selectedIndex) {
        item.classList.add('selected');
      }

      item.textContent = cmd.label;
      item.addEventListener('click', () => executeCommand(cmd));
      results.appendChild(item);
    });

  announceResults();
  updateSelection();
}

function updateSelection() {
    const input = document.getElementById('cmd-palette-input');
    const items = document.querySelectorAll('.cmd-palette-item');

    items.forEach((item, index) => {
      const isSelected = index === selectedIndex;
      item.classList.toggle('selected', isSelected);
      item.setAttribute('aria-selected', isSelected ? 'true' : 'false');

      if (isSelected) {
        input.setAttribute('aria-activedescendant', item.id);
        item.scrollIntoView({ block: 'nearest' });
    }
  });
}

function executeCommand(cmd) {
  logger.debug('Executing command:', cmd.label);

  closePalette();

  // If command has a custom action, execute it
  if (cmd.action) {
    cmd.action();
    return;
  }

  // Otherwise navigate to URL
  if (cmd.external) {
    window.open(cmd.url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = cmd.url;
  }
}

function trapFocus(e) {
    if (e.key !== 'Tab') return;

    const palette = document.getElementById('cmd-palette');
    if (!palette) return;

    const focusableElements = palette.querySelectorAll(
      'input, [role="option"]:not([aria-disabled="true"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
  }
}

function openPalette() {
    if (isOpen) return;

    logger.debug('Command palette opened');

    previousActiveElement = document.activeElement;

    let overlay = document.getElementById('cmd-palette-overlay');
    if (!overlay) {
      const elements = createPalette();
      overlay = elements.overlay;
      setupEventListeners();
    }

    isOpen = true;
    selectedIndex = 0;
    overlay.style.display = 'flex';

    const input = document.getElementById('cmd-palette-input');
    input.value = '';
    input.focus();

  const results = document.getElementById('cmd-palette-results');
  renderResults(results);
}

function closePalette() {
    if (!isOpen) return;

    logger.debug('Command palette closed');

    isOpen = false;
    const overlay = document.getElementById('cmd-palette-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }

    if (previousActiveElement) {
      previousActiveElement.focus();
    previousActiveElement = null;
  }
}

function setupEventListeners() {
    const input = document.getElementById('cmd-palette-input');
    const results = document.getElementById('cmd-palette-results');
    const overlay = document.getElementById('cmd-palette-overlay');
    const palette = document.getElementById('cmd-palette');

    input.addEventListener('input', () => {
      selectedIndex = 0;
      renderResults(results);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
        return;
      }

      if (e.key === 'ArrowDown' || (e.ctrlKey && e.key === 'n')) {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
        updateSelection();
        return;
      }

      if (e.key === 'ArrowUp' || (e.ctrlKey && e.key === 'p')) {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        updateSelection();
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
        return;
      }

      trapFocus(e);
    });

    palette.addEventListener('keydown', trapFocus);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closePalette();
    }
  });
}

export function initCommandPalette(commandList) {
  // Set the commands
  commands = commandList;
  filteredCommands = [...commands];

  logger.info('Command palette initialized with', commands.length, 'commands');

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !isOpen && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      openPalette();
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) {
        closePalette();
      } else {
        openPalette();
      }
      return;
    }
  });
}
