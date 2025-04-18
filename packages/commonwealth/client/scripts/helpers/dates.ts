import { pluralize } from 'helpers/index';
import moment from 'moment';

export const getRelativeTimestamp = (date: number | string | moment.Moment) => {
  const now = moment();
  const inputDate = moment(date);

  const secondsDiff = now.diff(inputDate, 'seconds');
  const minutesDiff = now.diff(inputDate, 'minutes');
  const hoursDiff = now.diff(inputDate, 'hours');
  const daysDiff = now.diff(inputDate, 'days');
  const weeksDiff = now.diff(inputDate, 'weeks');
  const monthsDiff = now.diff(inputDate, 'months');
  const yearsDiff = now.diff(inputDate, 'years');

  if (secondsDiff <= 59) {
    return 'Less than 1 min ago';
  } else if (minutesDiff <= 59) {
    return `${minutesDiff} min ago`;
  } else if (hoursDiff <= 23) {
    return `${pluralize(hoursDiff, 'hour')} ago`;
  } else if (daysDiff <= 6) {
    return `${pluralize(daysDiff, 'day')} ago`;
  } else if (weeksDiff <= 4) {
    return `${pluralize(weeksDiff, 'week')} ago`;
  } else if (monthsDiff <= 12) {
    return `${pluralize(monthsDiff, 'month')} ago`;
  } else {
    return `${pluralize(yearsDiff, 'year')} ago`;
  }
};
