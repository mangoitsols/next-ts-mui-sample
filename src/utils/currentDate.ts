export const CurrentDate = () => {
  const date = new Date();

  const options: any = { day: "2-digit", month: "short", year: "numeric" };

  let currentDate = date.toLocaleDateString("en-GB", options);

  return currentDate;
};
