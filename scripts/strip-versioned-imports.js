const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === 'build' || file === '.git') return;
      walk(full, fileList);
    } else if (/\.(ts|tsx|js|jsx|tsd|json|config|css|md)$/.test(file)) {
      fileList.push(full);
    }
  });
  return fileList;
}

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  // remove package@x.y.z in import/require paths
  content = content.replace(/(['\"])(@?[^'\"]+?)@\d+\.\d+\.\d+(.*?)\1/g, (m, q, pkg, tail) => {
    // preserve any trailing path after version (e.g. pkg@1.2.3/path)
    if (tail && tail.startsWith('/')) return `${q}${pkg}${tail}${q}`;
    return `${q}${pkg}${q}`;
  });
  // remove .tsx extension in local imports like './App.tsx' -> './App'
  content = content.replace(/(['\"]\.\/[^'\"]+?)\.tsx(['\"])/g, (m, p1, p2) => `${p1}${p2}`);

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
}

const root = path.resolve(__dirname, '..');
const files = walk(path.join(root, 'src'));
files.push(path.join(root, 'vite.config.ts'));
files.forEach((f) => {
  if (fs.existsSync(f)) fixFile(f);
});
console.log('Done');
