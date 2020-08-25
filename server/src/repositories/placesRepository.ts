import db from '../database/connection'

import convertHourToMinutes from '../utils/convertHourToMinutes'

interface InformationItem {
    uf: string;
    city: string;
    week_day: number;
    from: string;
    to: string;
}

interface FiltersItem {
    uf: string;
    city: string;
    week_day: string;
    place: string;
    time: string;
}

exports.getAll = async(filters: FiltersItem) => {
    const uf = filters.uf
    const city = filters.city
    const week_day = filters.week_day 
    const place = filters.place
    const time = filters.time

    const timeInMinutes = convertHourToMinutes(time)

    const places = await db('places')
        .whereExists(function () {
            this.select('place_information.*')
                .from('place_information')
                .whereRaw('`place_information`.`place_id` = `places`.`id`')
                .whereRaw('`place_information`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`place_information`.`from` <= ??', [timeInMinutes])
                .whereRaw('`place_information`.`to` > ??', [timeInMinutes])
        })
        .where('places.place', '=', place)
        .where('place_information.uf', '=', uf)
        .where('place_information.city', '=', city)
        .where('place_information.week_day', '=', week_day)
        .join('place_information', 'places.id', '=', 'place_information.place_id')
        .select(['places.*', 'place_information.uf', 'place_information.city', 'place_information.from', 'place_information.to'])
    
    return places
}

exports.create = async(name: string, avatar: string, place: string, address: string, whatsapp: string, bio: string, information: any) => {
    const trx = await db.transaction()

    try {
        const insertedPlacesIds = await trx('places').insert({
            name,
            avatar,
            place,
            address,
            whatsapp,
            bio,
        })

        const place_id = insertedPlacesIds[0]

        const placeInformation = information.map((informationItem: InformationItem) => {
            return {
                place_id,
                uf: informationItem.uf,
                city: informationItem.city,
                week_day: informationItem.week_day,
                from: convertHourToMinutes(informationItem.from),
                to: convertHourToMinutes(informationItem.to)
            }
        })

        await trx('place_information').insert(placeInformation)

        await trx.commit()
    } catch (e) {
        await trx.rollback()
    }
}