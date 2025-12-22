const fs = require('fs');
const path = require('path');

const sourceDir = 'c:/Users/ronal/OneDrive/Desktop/Proyectos/Personales/radio/emisora-latians/Emisoras_-Latinas/assets/img';
const destDir = 'c:/Users/ronal/OneDrive/Desktop/Proyectos/Personales/radio/Radio-Emisoras-Latinas/public/img';

// Crear directorio de destino si no existe
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('✅ Directorio public/img creado');
}

// Leer archivos del directorio fuente
const files = fs.readdirSync(sourceDir);

let copied = 0;
let skipped = 0;

files.forEach(file => {
  // Ignorar archivos temporales
  if (file.startsWith('~$')) {
    skipped++;
    return;
  }

  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);

  // Copiar solo si es un archivo
  if (fs.statSync(sourcePath).isFile()) {
    fs.copyFileSync(sourcePath, destPath);
    copied++;
    console.log(`✅ Copiado: ${file}`);
  }
});

console.log(`\n🎉 Proceso completado:`);
console.log(`   - ${copied} archivos copiados`);
console.log(`   - ${skipped} archivos omitidos`);
