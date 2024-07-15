const { Client } = require('pg');
const fs = require('fs');

// Configura tu conexión a PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'finances',
  password: 'magamia',
  port: 5432,
});

async function exportMovements() {
  try {
    // Conecta a la base de datos
    await client.connect();

    // Consulta para obtener todos los datos de la tabla movements
    const res = await client.query('SELECT * FROM movements');
    
    // Genera consultas SQL a partir de los datos obtenidos
    const queries = res.rows.map(row => {
      return `INSERT INTO movements (expense_id, description, quantity, movement_type, expense_date) VALUES (${row.expense_id}, '${row.description.replace(/'/g, "''")}', ${row.quantity}, ${row.movement_type}, '${row.expense_date.toISOString().split('T')[0]}');`;
    }).join('\n');

    // Escribe las consultas en un archivo .sql
    fs.writeFileSync('movements_export.sql', queries, 'utf8');

    console.log('Las consultas SQL se han guardado en movements_export.sql');

  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
  } finally {
    // Cierra la conexión a la base de datos
    await client.end();
  }
}

exportMovements();
