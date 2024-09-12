import { readFile } from 'fs/promises'

const fileUsers = await readFile('./data/users.json', 'utf-8')
const userData = JSON.parse(fileUsers)

export const getUserById = (id) => {
    return userData.find(e => e.id === id)
}

