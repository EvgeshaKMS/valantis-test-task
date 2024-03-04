export const getUTCDate = () => {
  const dateNow = new Date();

  const fullYearUTC = dateNow.getUTCFullYear();

  const monthUTC =
    dateNow.getUTCMonth() + 1 < 10
      ? `0${dateNow.getUTCMonth() + 1}`
      : (dateNow.getUTCMonth() + 1).toString();

  const dayUTC =
    dateNow.getUTCDate() < 10 ? `0${dateNow.getUTCDate()}` : dateNow.getUTCDate().toString();

  return fullYearUTC + monthUTC + dayUTC;
};
