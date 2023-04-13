import { IncomingMessage, ServerResponse } from 'http'
import DB from '@database'
import enablePublicAccess from '@cors'

// Función asíncrona que maneja la solicitud HTTP GET para obtener todos los datos de la base de datos y devuelve una respuesta en formato JSON
const allAvos = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // Generally, you would not want this in your apps.
    // See more in 'cors.js'
    // Habilitar el acceso público a la API
    await enablePublicAccess(req, res)

    // Crear una nueva instancia de la clase DB para conectarse a la base de datos
    const db = new DB()
    // Obtener todos los datos de la base de datos utilizando el método getAll
    const allEntries = await db.getAll()
    // Obtener la longitud de los datos obtenidos
    const length = allEntries.length

    // Notice: We're manually setting the response object
    // However Next.JS offers Express-like helpers :)
    // https://nextjs.org/docs/api-routes/response-helpers
    // Configurar las cabeceras de la respuesta
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*') // Permitir el acceso desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET') // Permitir sólo el método GET

    // Devolver los datos en formato JSON
    res.end(JSON.stringify({ length, data: allEntries }))
  } catch (e) {
    // Manejar los errores y devolver una respuesta de error genérica en caso de que ocurra una excepción
    console.error(e)
    res.statusCode = 500
    res.end(
      JSON.stringify({ length: 0, data: [], error: 'Something went wrong' })
    )
  }
}

// Exportar la función allAvos como un módulo
export default allAvos
