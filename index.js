import express from 'express'

import userRouter from './router/user.routes.js'
import prodRouter from './router/prod.routes.js'
import ventRouter from './router/ventas.routes.js'
import metPagoRouter from './router/metPago.routes.js'

const app = express()
const port = 3001

app.use(express.json());
app.listen(port, ()=>{
    console.log(`Servidor online en puerto ${port}.`)
})

app.use('/users', userRouter)
app.use('/prod', prodRouter)
app.use('/vent', ventRouter)
app.use('/mpago',metPagoRouter)