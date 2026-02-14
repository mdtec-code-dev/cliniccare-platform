const { execSync } = require('child_process');
const os = require('os');

// Mata procesos huerfanos de Next.js (node) y Django (python runserver)
// que pueden quedar vivos despues de cancelar pnpm dev / turbo

const isWin = os.platform() === 'win32';

function kill(processName, port) {
  try {
    if (isWin) {
      // Matar por puerto
      const netstat = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, { encoding: 'utf-8' });
      const lines = netstat.trim().split('\n');
      const pids = new Set();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== '0') pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: 'inherit' });
          console.log(`Proceso ${processName} (PID ${pid}, puerto ${port}) terminado.`);
        } catch (_) {
          // ya murio
        }
      }
    } else {
      // Unix: matar por puerto con lsof
      const lsof = execSync(`lsof -ti :${port}`, { encoding: 'utf-8' });
      const pids = lsof.trim().split('\n').filter(Boolean);
      for (const pid of pids) {
        try {
          execSync(`kill -9 ${pid}`, { stdio: 'inherit' });
          console.log(`Proceso ${processName} (PID ${pid}, puerto ${port}) terminado.`);
        } catch (_) {
          // ya murio
        }
      }
    }
  } catch (_) {
    console.log(`No se encontraron procesos de ${processName} en puerto ${port}.`);
  }
}

console.log('Buscando procesos huerfanos...\n');
kill('Next.js (frontend)', 3000);
kill('Next.js (frontend)', 3001);
kill('Django (backend)', 8000);
console.log('\nListo.');
