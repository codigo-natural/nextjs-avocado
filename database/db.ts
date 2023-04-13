// Oh you curious...
// This is not a real database,
// But let's imagine it is one :)
import allData from './data'

class Database {
  constructor() {}

  // Método asíncrono para obtener todos los productos de la base de datos simulada
  async getAll(): Promise<TProduct[]> {
    const asArray = Object.values(allData)
    await randomDelay() // Esperar un tiempo aleatorio para simular el retraso de una consulta de base de datos real
    return asArray
  }

  // Método asíncrono para obtener un producto por ID de la base de datos simulada
  async getById(id: string): Promise<TProduct | null> {
    // Comprobar si el ID del producto existe en la base de datos simulada
    if (!Object.prototype.hasOwnProperty.call(allData, id)) {
      return null
    }

    // Si el ID del producto existe, devolver la entrada correspondiente de la base de datos
    const entry = allData[id]
    await randomDelay() // Esperar un tiempo aleatorio para simular el retraso de una consulta de base de datos real
    return entry
  }
}

// Let's also add a delay to make it a bit closer to reality
// Función para simular el retraso de una consulta de base de datos real
// Se agrega un retraso aleatorio entre 100 y 350 milisegundos antes de resolver la promesa
const randomDelay = () =>
  new Promise((resolve) => {
    const max = 350
    const min = 100
    const delay = Math.floor(Math.random() * (max - min + 1)) + min

    setTimeout(resolve, delay)
  })

export default Database // Exportar la clase Database como un módulo
