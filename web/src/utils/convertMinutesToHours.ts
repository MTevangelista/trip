import moment from 'moment'

export default function convertMinutesToHours(time: number) {
    let h = time / 60 
    let m = time % 60 

    return moment.utc().hours(h).minutes(m).format("hh:mm A")
}