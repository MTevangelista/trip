import moment from 'moment'

export default function convertMinutesToHours(time: number) {
    let h = time / 60 | 0
    let m = time % 60 | 0
    const hourFormat = 'HH:mm'
    const HourUtc = moment.utc().hours(h).minutes(m)
    const localHour = HourUtc.local()

    return localHour.format(hourFormat)
}