import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

const getCurrentDateInUTC = (stringFormat: string = 'MM-DD-YYYY') => {
  dayjs.extend(utc);
  return dayjs.utc().format(stringFormat);
};

export { getCurrentDateInUTC };
