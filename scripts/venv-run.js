const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Resolver la ruta del Python del venv desde la raiz del monorepo
const root = path.resolve(__dirname, '..');
const venvWin = path.join(root, '.venv', 'Scripts', 'python.exe');
const venvUnix = path.join(root, '.venv', 'bin', 'python');

let pythonPath;

if (fs.existsSync(venvWin)) {
  pythonPath = venvWin;
} else if (fs.existsSync(venvUnix)) {
  pythonPath = venvUnix;
} else {
  console.error('ERROR: No se encontro el entorno virtual (.venv).');
  console.error('Crea el venv con: python -m venv .venv');
  console.error('Luego instala dependencias: pip install -r backend/requirements.txt');
  process.exit(1);
}

// Los argumentos despues de "node scripts/venv-run.js" se pasan a python
const args = process.argv.slice(2).join(' ');
const cmd = `"${pythonPath}" ${args}`;

try {
  execSync(cmd, { stdio: 'inherit', cwd: path.join(root, 'backend') });
} catch (e) {
  process.exit(e.status || 1);
}
