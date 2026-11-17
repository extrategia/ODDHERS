// Descarga las fotografías de stock provisionales a public/img/.
// Uso: npm run stock   (el flujo de GitHub Actions lo ejecuta antes de compilar)
// No sobrescribe archivos existentes: si pones tu propia imagen con el mismo nombre, se respeta.
import { readFile, writeFile, access, mkdir } from 'node:fs/promises';

const { images } = JSON.parse(await readFile(new URL('../src/content/stock.json', import.meta.url)));
const dir = new URL('../public/img/', import.meta.url);
await mkdir(dir, { recursive: true });

let failed = 0;
for (const [key, { id, photo, file }] of Object.entries(images)) {
  const target = new URL(file, dir);
  try { await access(target); console.log(`= ${file} (ya existe)`); continue; } catch {}
  try {
    const res = await fetch(`https://images.unsplash.com/${photo}?w=1800&q=72&fm=jpg&fit=crop`, { redirect: 'follow' });
    if (!res.ok || !(res.headers.get('content-type') || '').startsWith('image/')) throw new Error(`HTTP ${res.status}`);
    await writeFile(target, Buffer.from(await res.arrayBuffer()));
    console.log(`+ ${file}`);
  } catch (e) {
    failed++;
    console.warn(`! No se pudo descargar ${key} (${id}): ${e.message}`);
  }
}
if (failed) console.warn(`\n${failed} imagen(es) sin descargar: el sitio mostrará un fondo gris en su lugar.`);
