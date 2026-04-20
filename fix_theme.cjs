const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix background hierarchy:
      // Layout bg should be zinc-950 in dark mode
      // Cards should be zinc-900 in dark mode
      
      content = content.replace(/dark:bg-\[#111\]/g, 'dark:bg-zinc-900');
      content = content.replace(/bg-\[#111\] dark:bg-white/g, 'bg-zinc-900 dark:bg-zinc-50');
      content = content.replace(/bg-white dark:bg-\[#111\]/g, 'bg-white dark:bg-zinc-900');
      content = content.replace(/bg-\[#111\]/g, 'bg-zinc-900');
      
      // Make dark:bg-gray-950 mostly zinc-900 or zinc-950
      // Instead of manual replaces, let's substitute all 'gray-' with 'zinc-' first
      content = content.replace(/gray-/g, 'zinc-');
      
      // Ensure layout background is nice and dark
      content = content.replace(/bg-zinc-50 dark:bg-zinc-900/g, 'bg-zinc-50 dark:bg-zinc-950');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walk('./src');
console.log('Fixed themes');
