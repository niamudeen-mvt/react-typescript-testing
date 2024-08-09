// code related to the local storage

export const setItemsIntoLS = (
  key: string,
  value: any,
  isJson: boolean = false
) => {
  if (!value) return;

  if (isJson) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  return localStorage.setItem(key, value);
};

export const getItemsFromLC = (key: string, isJson: boolean = false) => {
  if (!key) return;

  if (isJson && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  return localStorage.getItem(key);
};

export const removeItemFromLS = (key: string) => {
  return localStorage.removeItem(key);
};

// code related to the date formatting

export const formattedDate = (dateTime: number | Date | undefined) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateFormatter.format(dateTime);
};

// export const formattedTime = (dateTime: number | Date | undefined) => {
//   const filterdDay = daysOfWeek
//     .map((day) => {
//       if (day.value === dateTime.toString().substring(0, 3)) {
//         return day.label;
//       }
//     })
//     .filter((label) => label !== undefined);

//   const timeFormatter = new Intl.DateTimeFormat("en-US", {
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   });

//   return timeFormatter.format(dateTime) + "," + filterdDay;
// };
