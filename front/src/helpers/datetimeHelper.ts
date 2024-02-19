import moment from 'moment';

export default class DateTimeHelper {
    static localToUTC(date: string | Date): string {
        return moment(date).utc().format();
    }

    static utcToLocal(date: string | Date): string {
        return moment.utc(date).local().format();
    }
}