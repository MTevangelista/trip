import db from '../database/connection'

import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

exports.create = async(name: string, avatar: string, place: string, address: string, whatsapp: string, bio: string, schedule: any) => {
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

        const placeSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                place_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to)
            }
        })

        await trx('place_schedule').insert(placeSchedule)

        await trx.commit()
    } catch (e) {
        await trx.rollback()
    }
}