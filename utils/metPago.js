import { readFile } from 'fs/promises'

const fileMpago = await readFile('./data/metodoDePago.json', 'utf-8')
const mPagoData = JSON.parse(fileMpago)

export const getMetPagoById = (id) => {
    return mPagoData.find(e => e.id === id)
}

