import dateFormat from 'dateformat';

export const formatDate = dateString => {
  const now = new Date();
  const format = dateString.toLowerCase();
  
  return dateFormat(now, format);
};
