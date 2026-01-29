// Main entry point for all JavaScript modules

import { initNav } from 'nav';
import { initCommandPalette } from 'command-palette';
import { initColorSwitcher } from 'color-switcher';

// Command palette items
const commands = [
  { label: 'About', url: '/', keywords: 'home about brian' },
  { label: 'Resume', url: '/resume.html', keywords: 'resume experience work cv' },
  { label: 'GitHub', url: '/github.html', keywords: 'github code projects', external: true }
];

// Color theme definitions
const colorThemes = [
  { name: 'Coral', color: '#ff7b72' },
  { name: 'Salmon', color: '#ff6b6b' },
  { name: 'Peach', color: '#ff9e64' },
  { name: 'Orange', color: '#ffa657' },
  { name: 'Gold', color: '#e5c07b' },
  { name: 'Amber', color: '#d4a574' },
  { name: 'Lavender', color: '#bb9af7' },
  { name: 'Purple', color: '#c792ea' },
  { name: 'Mint Green', color: '#73daca' },
  { name: 'Teal', color: '#7dcfff' },
  { name: 'Sky Blue', color: '#7aa2f7' },
  { name: 'Blue', color: '#82aaff' },
  { name: 'Cream', color: '#e6e1cf' },
  { name: 'Off-White', color: '#cfc9b6' },
  { name: 'Soft Green', color: '#98c379' },
  { name: 'Green', color: '#89b482' }
];

// Initialize all modules
initNav();
initCommandPalette(commands);
initColorSwitcher(colorThemes);
