import { Router } from "express";
import {readFile, writeFile} from 'fs/promises'

const router = Router()

const fileProd = await readFile('./data/productos.json', 'utf-8')
const prodData = JSON.parse(fileProd)

router.get('/all', (req, res)=>{
    res.status(200).json(userData)
})

router.get('/byId/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const result = prodData.find(e=> e.id === id)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`No se encuentra el producto con el id: ${id}`)
    }
})

router.get('/byCategory/:category', (req,res)=>{
    const category = req.params.category
    const result = prodData.filter(e => e.categoria.nombre === category)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(400).json(`No se encuentra la siguiente categoria: ${id}`)
    }
})


router.put('/update', (req, res)=>{
    const id = req.body.id
    const newPrice = req.body.precio

    try{
        const index = prodData.findIndex(e => e.id == id)

        if(index != -1){
            prodData[index].precio = newPrice
            writeFile('./data/productos.json', JSON.stringify(prodData,null,2));
            res.status(200).json('Precio Actualizado!!')
        }else{
            res.status(400).json('No se encontro el producto.')
        }

    }catch(error){
        res.status(500).json('Error al actualizar el precio.')
    }
})



export default router