import { NextApiRequest, NextApiResponse } from 'next'
import DB from '@database'
import enablePublicAccess from '@cors'

// Función asíncrona que maneja la solicitud HTTP GET para obtener detalles de un aguacate en particular y devuelve una respuesta en formato JSON
const AvoDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Generally, you would not want this in your apps.
    // See more in 'cors.js'

    // Habilitar el acceso público a la API
    await enablePublicAccess(req, res)

    // Crear una nueva instancia de la clase DB para conectarse a la base de datos
    const db = new DB()
    // Obtener el ID del aguacate de los parámetros de consulta de la solicitud
    const avoId = req.query.id as string

    // Obtener los detalles del aguacate utilizando el método getById
    const avo = await db.getById(avoId)

    // Notice: We're using Next.JS response helpers here :)
    // https://nextjs.org/docs/api-routes/response-helpers
    // Devolver los detalles del aguacate en formato JSON utilizando la función de ayuda proporcionada por Next.js
    res.status(200).json(avo)
  } catch (e) {
    console.error(e)
    res.status(404).end()
  }
}

export default AvoDetail // Exportar la función AvoDetail como un módulo
