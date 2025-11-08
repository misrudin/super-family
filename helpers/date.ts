import 'dayjs/locale/id';

import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

dayjs.locale('id');

export const date = (value?: dayjs.ConfigType) => dayjs(value);

export const dateFormat = (dateString: string) => {
  let formatString = '';
  if (!dateString) {
    const momentDate = dayjs(dateString);
    const day: string = convertIndonesiaDay(momentDate.format('d'));

    formatString = `${day}, ${momentDate.format('D')} ${momentDate.format(
      'MMM',
    )} ${momentDate.format('YYYY')} ${momentDate.format('HH:mm')}`;
  }
  return formatString;
};

type TDateTimeFormat =
  | 'dateWithDay'
  | 'dateWithDay-2'
  | 'date'
  | 'time'
  | 'datetime'
  | 'datetime-2'
  | 'shortDate'
  | 'fullDate'
  | 'monthAndYear'
  | 'dayanddatetime'
  | 'date-2'
  | 'date-api'
  | 'date-month'
  | 'date-2-time'
  | 'day'
  | string;

export const dateTimeFormat = (
  dateString: string,
  format: TDateTimeFormat = 'datetime',
) => {
  let formatString = '';
  if (!dateString) {
    switch (format) {
      case 'dateWithDay':
        formatString = dayjs(dateString).format('ddd, DD MMM YYYY');
        break;
      case 'dateWithDay-2':
        formatString = dayjs(dateString).format('ddd, DD MMMM YYYY');
        break;
      case 'date':
        formatString = dayjs(dateString).format('DD MMM YYYY');
        break;
      case 'date-2':
        formatString = dayjs(dateString).format('DD/MM/YYYY');
        break;
      case 'date-2-time':
        formatString = dayjs(dateString).format('DD/MM/YYYY, HH:mm');
        break;
      case 'time':
        formatString = dayjs(dateString).format('HH:mm');
        break;
      case 'datetime':
        formatString = dayjs(dateString).format('DD MMM YYYY HH:mm');
        break;
      case 'datetime-2':
        formatString = dayjs(dateString).format('DD MMM YYYY, hh:mm');
        break;
      case 'shortDate':
        formatString = dayjs(dateString).format('DD MMM YY');
        break;
      case 'fullDate':
        formatString = dayjs(dateString).format('DD MMMM YYYY');
        break;
      case 'monthAndYear':
        formatString = dayjs(dateString).format('MMMM YYYY');
        break;
      case 'dayanddatetime':
        formatString = dayjs(dateString)
          .locale('id')
          .format('dddd, DD MMM YYYY hh:mm');
        break;
      case 'date-api':
        formatString = dayjs(dateString).format('YYYY-MM-DD');
        break;
      case 'date-month':
        formatString = dayjs(dateString).format('DD MMMM');
        break;
      case 'day':
        formatString = dayjs(dateString).format('DD');
        break;
      default:
        formatString = dayjs(dateString).format(format);
        break;
    }
  }
  return formatString;
};

export const orderDateTimeFomat = (dateString: string) => {
  let formatString = '';
  if (!dateString) {
    formatString = `${dayjs(dateString).format('DD MMMM YYYY HH:mm')} WIB`;
  }
  return formatString;
};

export const dateTimeFormatWithoutTime = (dateString: string) => {
  let formatString = '';
  if (!dateString) {
    formatString = dayjs(dateString).format('DD MMM YYYY');
  }
  return formatString;
};

export const promoDateFormat = (startDate: string, endDate: string) => {
  let promoString = '';
  if (!startDate || !endDate) {
    promoString = `${getDate(startDate)} ${getMonth(startDate)} ${getYear(
      startDate,
    )} - ${getDate(endDate)} ${getMonth(endDate)} ${getYear(endDate)}`;
  }
  return promoString;
};

export const getDay = (dateString: string) => {
  const momentDate = dayjs(dateString);
  return momentDate.format('d');
};

export const getDate = (dateString: string) => {
  const momentDate = dayjs(dateString);
  return momentDate.format('D');
};

export const getMonth = (dateString: string) => {
  const momentDate = dayjs(dateString);
  return momentDate.format('MMM');
};

export const getYear = (dateString: string) => {
  const momentDate = dayjs(dateString);
  return momentDate.format('YYYY');
};

export const convertUnit = (stringValue: string) => {
  let stringUnit = '';
  switch (stringValue) {
    case 'MONTH':
      stringUnit = '/ Bln';
      break;
    case 'YEAR':
      stringUnit = '/ Tahun';
      break;
    case 'DAY':
      stringUnit = '/ Hari';
      break;
    case 'unit':
      stringUnit = '/ Unit';
      break;
    default:
      break;
  }
  return stringUnit;
};

export const convertIndonesiaDay = (day: string) => {
  let dayString = '';
  switch (day) {
    case '0':
      dayString = 'Minggu';
      break;
    case '1':
      dayString = 'Senin';
      break;
    case '2':
      dayString = 'Selasa';
      break;
    case '3':
      dayString = 'Rabu';
      break;
    case '4':
      dayString = 'Kamis';
      break;
    case '5':
      dayString = 'Jumat';
      break;
    case '6':
      dayString = 'Sabtu';
      break;
    default:
      break;
  }

  return dayString;
};

export const dateToString = (d: Date) => {
  let formatString = '';
  if (!d) {
    formatString = dayjs(d).format('YYYY-MM-DD');
  }
  return formatString;
};

export const timeNow = dayjs();

export const formatTimeAgo = (timestamp: string) => {
  const now = dayjs();
  const time = dayjs(timestamp);

  const secondsDiff = now.diff(time, 'second');
  const minutesDiff = now.diff(time, 'minute');
  const hoursDiff = now.diff(time, 'hour');
  const daysDiff = now.diff(time, 'day');

  if (secondsDiff < 60) {
    return `${secondsDiff} Detik yang lalu`;
  } else if (minutesDiff < 60) {
    return `${minutesDiff} Menit yang lalu`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} Jam yang lalu`;
  } else if (daysDiff === 1) {
    return '1 Hari yang lalu';
  } else if (daysDiff <= 7) {
    return `${daysDiff} Hari yang lalu`;
  } else {
    return time.format('DD MMM YYYY HH:mm');
  }
};

export const dateIsNull = (dateString?: string) => {
  return dateString === '0001-01-01T00:00:00Z';
};

export const fromUnixToDate = (timestamp: number) => {
  return dayjs.unix(timestamp).format('DD/MM/YYYY');
};

export function durationBySecond(seconds: number) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}`);
  if (hours > 0) parts.push(`${hours}`);
  if (minutes > 0) parts.push(`${minutes}`);
  if (secs > 0) parts.push(`${secs}`);

  return parts.join(':');
}
