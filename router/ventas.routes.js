import { Router } from "express";
import { readFile, writeFile } from 'fs/promises'

import { getUserById } from "../utils/user.js";
import { getMetPagoById } from "../utils/metPago.js";

const router = Router()

const fileVentas = await readFile('./data/ventas.json', 'utf-8')
const ventasData = JSON.parse(fileVentas)


router.post('/consulta', (req,res)=>{

    const from = req.body.from
    const to = req.body.to

    let aux_nombre = ''
    let aux_metPago = ''

    try{

        const arr = ventasData.filter(e => e.fecha >= from && e.fecha <= to)

        const result = arr.map(e=>{
            
            aux_nombre = getUserById(e.id_cliente)
            aux_nombre = aux_nombre.nombre + ' ' + aux_nombre.apellido

            aux_metPago = getMetPagoById(e.metodo_pago)
            aux_metPago = aux_metPago.metodo


            
            return {
                id_venta: e.id_venta,
                Fecha: e.fecha,
                Cliente: aux_nombre,
                Pago: aux_metPago,
                Producto: e.productos
            }
        })

        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json(`No hay ventas entre ${from} y ${to}.`)
        }


    }catch(error){
        res.status(500).json(`Error al realizar la conuslta!`)
    }
})



export default router