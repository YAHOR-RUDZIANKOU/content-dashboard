const pluralize = (countComments: number, forms: string[]): string => {
  const resFirst = countComments % 100;
  if (resFirst >= 11 && resFirst <= 14) {
    return `${countComments} ${forms[0]}`;
  }
  const resSecond = countComments % 10;
  if (resSecond === 2 || resSecond === 3 || resSecond === 4) {
    return `${countComments} ${forms[1]}`;
  } else {
    return `${countComments} ${forms[2]}`;
  }
};

export default pluralize;

export const showIconsLogo = (userName: string | undefined) => {
  if (userName) {
    return userName
      .split(" ")
      .map((value) => value[0])
      .join("")
      .toUpperCase();
  }
};
