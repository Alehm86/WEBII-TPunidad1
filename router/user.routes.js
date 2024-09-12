import { Router } from "express";
import { readFile, writeFile } from 'fs/promises'

const router = Router()

const fileUsers = await readFile('./data/users.json', 'utf-8')
const userData = JSON.parse(fileUsers)

router.get('/all', (req, res)=>{
    res.status(200).json(userData)
})

router.post('/login', (req, res)=>{
    const email = req.body.email
    const pass = req.body.pass

    const result = userData.find(e => e.email === email && e.pass === pass)

    if(result){
        res.status(200).json(`Bienvenido ${result.nombre}`)
    }else{
        res.status(400).json(`${email} no existe o contraseña incorrecta`)
    }
})

router.get('/byId/:id', (req, res)=>{
    const id = parseInt(req.params.id)

    const result = userData.find(e => e.id === id)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`No se encuentra el usuario con la id: ${id}`)
    }
})


export default router