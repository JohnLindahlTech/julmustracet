const isProd = process.env.NODE_ENV === "production";

export const minLimitDate = new Date();
if (isProd) {
  minLimitDate.setUTCMonth(11, 1);
  minLimitDate.setUTCHours(-1, 0, 0, 0);
} else {
  minLimitDate.setMonth(minLimitDate.getMonth() - 1);
}

export const maxLimitDate = new Date();
if (isProd) {
  maxLimitDate.setUTCMonth(11, 21);
  maxLimitDate.setUTCHours(-1, 0, 0, -1);
} else {
}
