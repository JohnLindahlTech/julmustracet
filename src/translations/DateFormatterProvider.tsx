import React, { createContext, useContext, useMemo, FC } from "react";
import getDateFnsLocale from "./date-fns-locale";
import { format } from "date-fns";
import * as Sentry from "@sentry/node";

function setUpFormat(localeId?: string, formatStr = "Pp") {
  const locale = getDateFnsLocale(localeId);
  return (date: Date, formatString: string = formatStr) => {
    try {
      return format(date, formatString, { locale });
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      return "-";
    }
  };
}

export const DateFormatContext = createContext(setUpFormat());

export const DateFormatProvider: FC<{ locale: string }> = ({
  locale,
  children,
}) => {
  const formatDate = useMemo(() => {
    return setUpFormat(locale);
  }, [locale]);
  return (
    <DateFormatContext.Provider value={formatDate}>
      {children}
    </DateFormatContext.Provider>
  );
};

export const useDateFormat = (): ((
  date: Date,
  formatString?: string
) => string) => {
  return useContext(DateFormatContext);
};
