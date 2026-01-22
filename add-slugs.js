/**
 * Script para agregar slugs únicos a todas las emisoras
 * 
 * Genera un slug basado en el nombre de cada emisora:
 * - Minúsculas
 * - Espacios reemplazados por guiones
 * - Caracteres especiales eliminados
 * - Únicos por país
 * 
 * Uso: node add-slugs.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

/**
 * Genera un slug a partir de un nombre
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD') // Descomponer caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno solo
    .replace(/^-|-$/g, ''); // Eliminar guiones al inicio/final
}

/**
 * Asegura que el slug sea único agregando un sufijo numérico si es necesario
 */
function ensureUniqueSlug(slug, existingSlugs) {
  let uniqueSlug = slug;
  let counter = 1;
  
  while (existingSlugs.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

/**
 * Procesa un archivo JSON de emisoras
 */
function processStationFile(filePath) {
  console.log(`\n📁 Procesando: ${path.basename(filePath)}`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const existingSlugs = new Set();
    let slugsAdded = 0;
    let slugsUpdated = 0;
    
    data.forEach(station => {
      const originalSlug = station.slug;
      const baseSlug = generateSlug(station.nombre);
      const uniqueSlug = ensureUniqueSlug(baseSlug, existingSlugs);
      
      existingSlugs.add(uniqueSlug);
      
      if (!originalSlug) {
        slugsAdded++;
      } else if (originalSlug !== uniqueSlug) {
        slugsUpdated++;
      }
      
      station.slug = uniqueSlug;
    });
    
    // Guardar archivo actualizado
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`  ✅ ${data.length} emisoras procesadas`);
    console.log(`  📝 Slugs nuevos: ${slugsAdded}`);
    if (slugsUpdated > 0) {
      console.log(`  🔄 Slugs actualizados: ${slugsUpdated}`);
    }
    
    return { total: data.length, added: slugsAdded, updated: slugsUpdated };
  } catch (error) {
    console.error(`  ❌ Error procesando ${filePath}:`, error.message);
    return { total: 0, added: 0, updated: 0 };
  }
}

/**
 * Función principal
 */
function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  GENERADOR DE SLUGS PARA EMISORAS');
  console.log('═══════════════════════════════════════════════════════════');
  
  const files = fs.readdirSync(DATA_DIR)
    .filter(file => file.startsWith('emisoras_') && file.endsWith('.json'))
    .map(file => path.join(DATA_DIR, file));
  
  console.log(`\n📊 Archivos encontrados: ${files.length}`);
  
  let totalStations = 0;
  let totalAdded = 0;
  let totalUpdated = 0;
  
  files.forEach(file => {
    const result = processStationFile(file);
    totalStations += result.total;
    totalAdded += result.added;
    totalUpdated += result.updated;
  });
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  RESUMEN FINAL');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`📻 Total emisoras: ${totalStations}`);
  console.log(`✨ Slugs nuevos agregados: ${totalAdded}`);
  console.log(`🔄 Slugs actualizados: ${totalUpdated}`);
  console.log('═══════════════════════════════════════════════════════════\n');
}

main();
