import { Router } from "express";
import {readFile, writeFile} from 'fs/promises'

const router = Router()

const fileMetPago = await readFile('./data/metodoDePago.json', 'utf-8')
const metPagoData = JSON.parse(fileMetPago)

router.delete('/delete/:id', (req,res)=>{
    const metodo_id = req.params.id

    try{

        const index = metPagoData.findIndex(e=> e.id == metodo_id)

        if(index != -1){
            metPagoData.splice(index,1)
            writeFile('./data/metodoDePago.json', JSON.stringify(metPagoData,null,2));
            res.status(200).json('Metodo de pago eliminado.')
        }else{
            res.status(400).json('No se encontro al usuario.')
        }

        

    }catch(error){
        res.status(500).json('Error al eliminar metodo de pago.')
    }
})

export default router