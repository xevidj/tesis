import { DbCustomers, ICustomer } from './model'

export const create = async (req: any, res: any) => {
  const { card, name } = req.body

  if (!card) {
    res.status(400).send({ message: "Falta el identificador" })
    return
  }

  try {
    const exist: ICustomer | null = await DbCustomers.findOne({ card })
    if (exist) {
      res.status(400).send({ message: "El usuario ya existe" })
      return
    }
    const money = 0.5
    const points = 0
    const restart = new Date().getMonth()
    await DbCustomers.create({ card, name, money, points, restart })
    res.status(200).send({ message: "Registrado correctamente!" })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: "Error al registrar" })
    return
  }
}

export const pay = async (req: any, res: any) => {
  const { card, location } = req.body
  let { cost } = req.body

  if (!card) {
    res.status(400).send({ message: "Falta el identificador" })
    return
  }

  try {
    const customer: ICustomer | null = await DbCustomers.findOne({ card })
    if (!customer) {
      res.status(400).send({ message: "El usuario no existe" })
      return
    }

    cost = cost - (cost * 5 / 100)

    if (cost > customer.money) {
      res.status(400).send({ message: "Dinero insuficiente" })
      return
    }
    const money = customer.money - cost
    const last_location = {
      type: 'Point',
      coordinates: [location[0], location[1]]
    }

    const now = new Date().getMonth()
    if (now > customer.restart) {
      const restart = now
      const points = 0
      await customer.updateOne({ money, points, last_location, restart })
    } else {
      const points = customer.points + 5
      await customer.updateOne({ money, points, last_location, })
    }

    res.status(200).send({ message: "Disfrute el viaje!" })
  } catch (e) {
    res.status(400).send({ message: "Error al procesar" })
    return
  }
}

export const reload = async (req: any, res: any) => {
  const { card, load } = req.body

  if (!card) {
    res.status(400).send({ message: "Falta el identificador" })
    return
  }

  try {
    const customer: ICustomer | null = await DbCustomers.findOne({ card })
    if (!customer) {
      res.status(400).send({ message: "El usuario no existe" })
      return
    }

    const money = customer.money + load

    await customer.updateOne({ money })
    res.status(200).send({ message: "Recarga exitosa!" })
  } catch (e) {
    console.log(e)
    res.status(400).send({ message: "Error al procesar" })
    return
  }
}
