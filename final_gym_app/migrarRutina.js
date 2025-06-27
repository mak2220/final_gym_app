// migrarRutina.js
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require("mongodb");

async function migrate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("❌ No se encontró MONGODB_URI en .env");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("app_gym");
    const usuarios = db.collection("usuarios");

    const alumnos = await usuarios.find().toArray();

    for (const alumno of alumnos) {
      const rutinaAntigua = alumno.rutina || [];

      // Si ya está migrado (tiene array de ejercicios), lo saltamos
      const yaMigrado = rutinaAntigua.every(
        (dia) => Array.isArray(dia.ejercicios)
      );
      if (yaMigrado) {
        console.log(`⏭️ Ya migrado: ${alumno.nombre}`);
        continue;
      }

      const nuevaRutina = rutinaAntigua.map((diaObj) => {
        const { dia, ...ejerciciosRaw } = diaObj;
        const ejercicios = Object.entries(ejerciciosRaw).map(
          ([nombre, descripcion], index) => ({
            nombre,
            descripcion,
            orden: index + 1,
          })
        );

        return {
          dia,
          ejercicios,
        };
      });

      await usuarios.updateOne(
        { _id: alumno._id },
        { $set: { rutina: nuevaRutina } }
      );

      console.log(`✅ Migrado: ${alumno.nombre}`);
    }

    console.log("🚀 Migración completada.");
  } catch (err) {
    console.error("❌ Error en la migración:", err);
  } finally {
    await client.close();
  }
}

migrate();



