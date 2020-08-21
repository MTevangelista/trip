import { Request, Response } from 'express'

const repository = require('../repositories/placesRepository')

export default class PlacesController {
    async create(req: Request, res: Response) {
        const { name, avatar, place, address, whatsapp, bio, schedule } = req.body

        try {
            await repository.create(
                name,
                avatar,
                place,
                address,
                whatsapp,
                bio,
                schedule
            )
            return res.status(201).send()
        } catch (e) {
            return res.status(400).json({
                error: 'Unexpected error while creating a new place'
            })
        }
    }
}