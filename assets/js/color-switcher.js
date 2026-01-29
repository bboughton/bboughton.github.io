// Color Theme Switcher
// Press Ctrl+Shift+C to cycle through accent color options
// Toggle debug mode in console: localStorage.setItem('debug', 'true') or localStorage.removeItem('debug')

import { logger } from 'logger';

let colorThemes = [];
let currentThemeIndex = 0;

// Get today's date as a string (YYYY-MM-DD)
function getTodayDateString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Get the number of days since epoch (for consistent daily rotation)
function getDaysSinceEpoch() {
  const today = new Date();
  const epoch = new Date('1970-01-01');
  const diffTime = today - epoch;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Get the theme index for today (rotates daily through all themes)
function getThemeForToday() {
  return getDaysSinceEpoch() % colorThemes.length;
}

// Get saved user preference
function getUserPreference() {
  const saved = localStorage.getItem('colorPreference');
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

// Save user preference with today's date
function saveUserPreference(themeIndex) {
  const preference = {
    themeIndex: themeIndex,
    date: getTodayDateString()
  };
  localStorage.setItem('colorPreference', JSON.stringify(preference));
}

// Determine which theme to use on page load
function getInitialTheme() {
  const userPref = getUserPreference();
  const todayDate = getTodayDateString();

  // If user has a preference from today, use it
  if (userPref && userPref.date === todayDate) {
    return userPref.themeIndex;
  }

  // Otherwise, use today's automatic theme
  return getThemeForToday();
}


function applyColorTheme(index, savePreference = true) {
  const theme = colorThemes[index];
  document.documentElement.style.setProperty('--color-primary', theme.color);

  if (savePreference) {
    saveUserPreference(index);
  }

  logger.debug('Color switched to', theme.name, ':', theme.color);
}

export function initColorSwitcher(themes) {
  // Set the color themes
  colorThemes = themes;

  // Keyboard shortcut: Ctrl+Shift+C (Cmd+Shift+C on Mac)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
      applyColorTheme(currentThemeIndex);
    }
  });

  // Also support going backwards with Ctrl+Shift+X
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'X') {
      e.preventDefault();
      currentThemeIndex = (currentThemeIndex - 1 + colorThemes.length) % colorThemes.length;
      applyColorTheme(currentThemeIndex);
    }
  });

  // Initialize theme on page load
  currentThemeIndex = getInitialTheme();
  applyColorTheme(currentThemeIndex, false); // Don't save on initial load

  logger.info('Color Switcher initialized');
  logger.debug('Press Ctrl+Shift+C (or Cmd+Shift+C) to cycle through accent colors');
  logger.debug('Press Ctrl+Shift+X to go backwards');
  logger.debug('Today\'s automatic color:', colorThemes[getThemeForToday()].name);
  logger.debug('Current color:', colorThemes[currentThemeIndex].name);
}
