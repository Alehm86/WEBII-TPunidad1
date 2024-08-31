import { readFile } from 'fs/promises'
const items = await readFile('./data/productos.json', 'utf-8')
const users = await readFile('./data/users.json', 'utf-8')

const productos = JSON.parse(items)
const usuarios = JSON.parse(users)

console.log(productos)