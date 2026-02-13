const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Resolver la ruta del monorepo
const root = path.resolve(__dirname, "..");
const backendDir = path.join(root, "backend");

// Posibles ubicaciones del venv
const candidates = [
  path.join(root, ".venv"),        // monorepo/.venv
  path.join(backendDir, ".venv"),  // monorepo/backend/.venv
];

let pythonPath = null;

for (const venvDir of candidates) {
  const venvWin = path.join(venvDir, "Scripts", "python.exe");
  const venvUnix = path.join(venvDir, "bin", "python");

  if (fs.existsSync(venvWin)) {
    pythonPath = venvWin;
    break;
  }

  if (fs.existsSync(venvUnix)) {
    pythonPath = venvUnix;
    break;
  }
}

if (!pythonPath) {
  console.error("ERROR: No se encontro el entorno virtual (.venv).");
  console.error("Crea el venv con: python -m venv .venv");
  console.error("Luego instala dependencias: pip install -r requirements.txt");
  process.exit(1);
}

// Los argumentos despues de "node scripts/venv-run.js" se pasan a python
const args = process.argv.slice(2).join(" ");
const cmd = `"${pythonPath}" ${args}`;

try {
  execSync(cmd, {
    stdio: "inherit",
    cwd: backendDir,
    env: { ...process.env, PYTHONUNBUFFERED: "1" },
  });
} catch (e) {
  process.exit(e.status || 1);
}
