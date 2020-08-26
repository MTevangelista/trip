import express from 'express'
import cors from 'cors'

import placeRoute from './routes/place-route'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/places', placeRoute)

const port = 3333
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})