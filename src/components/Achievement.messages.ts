const achievements = (intl) => ({
  cheater: {
    title: intl.formatMessage({ defaultMessage: "Fuskare" }), // Cheater
    description: intl.formatMessage({
      defaultMessage: "Registrerat orimligt mycket dryck.",
    }),
  },
  first: {
    title: intl.formatMessage({ defaultMessage: "Första" }), // First
    description: intl.formatMessage({
      defaultMessage: "Registrerat minst 1 dryck.",
    }),
  },
  around_the_clock: {
    title: intl.formatMessage({ defaultMessage: "Around the Clock" }),
    description: intl.formatMessage({
      defaultMessage: "Registret dryck på dygnets alla timmar.",
    }),
  },
  double_tap: {
    title: intl.formatMessage({ defaultMessage: "Double tap" }),
    description: intl.formatMessage({
      defaultMessage: "Registrerat minst 2 drycker inom 15 minuter.",
    }),
  },
  connoisseur: {
    title: intl.formatMessage({ defaultMessage: "Connoisseur" }),
    description: intl.formatMessage({
      defaultMessage: "Smakat minst 5 olika märken.",
    }),
  },
  three: {
    title: intl.formatMessage({ defaultMessage: "Tredje gången gillt" }), // Thirds the charm
    description: intl.formatMessage({
      defaultMessage: "Druckit must 3 dagar i rad.",
    }),
  },
  five: {
    title: intl.formatMessage({ defaultMessage: "Arbetsmyra" }), // Worker bee
    description: intl.formatMessage({
      defaultMessage: "Druckit must 5 dagar i rad.",
    }),
  },
  seven: {
    title: intl.formatMessage({ defaultMessage: "Veckan runt" }), // Week
    description: intl.formatMessage({
      defaultMessage: "Druckit must 7 dagar i rad.",
    }),
  },
  fourteen: {
    title: intl.formatMessage({ defaultMessage: "Halvmåne" }), // Fortnight
    description: intl.formatMessage({
      defaultMessage: "Druckit must 14 dagar i rad.",
    }),
  },
  twenty: {
    title: intl.formatMessage({ defaultMessage: "Ihärdig" }), // Perseverance
    description: intl.formatMessage({
      defaultMessage: "Druckit must 20 dagar i rad",
    }),
  },
  twentyfour_seven: {
    title: intl.formatMessage({ defaultMessage: "24/7" }),
    description: intl.formatMessage({
      defaultMessage:
        "Druckit must på dygnets alla timmar och alla veckodagar.",
    }),
  },
  beginner: {
    title: intl.formatMessage({ defaultMessage: "Nybörjare" }), // Beginner
    description: intl.formatMessage({
      defaultMessage: "Druckit 1 liter must.",
    }),
  },
  sampler: {
    title: intl.formatMessage({ defaultMessage: "Provsmakare" }), // Sampler
    description: intl.formatMessage({
      defaultMessage: "Druckit 3 liter must.",
    }),
  },
  half_empty: {
    title: intl.formatMessage({ defaultMessage: "Halvtomt glas" }),
    description: intl.formatMessage({
      defaultMessage: "Druckit 5 liter must.",
    }),
  },
  half_filled: {
    title: intl.formatMessage({ defaultMessage: "Halvfullt glas" }),
    description: intl.formatMessage({
      defaultMessage: "Druckit 10 liter must.",
    }),
  },
  chug: {
    title: intl.formatMessage({ defaultMessage: "Chug! Chug! Chug!" }),
    description: intl.formatMessage({
      defaultMessage: "Druckit 20 liter must.",
    }),
  },
  gulp: {
    title: intl.formatMessage({ defaultMessage: "Big Gulp" }),
    description: intl.formatMessage({
      defaultMessage: "Druckit 30 liter must.",
    }),
  },
  legend: {
    title: intl.formatMessage({ defaultMessage: "Legend" }),
    description: intl.formatMessage({
      defaultMessage: "Druckit 50 liter must.",
    }),
  },
  maxed: {
    title: intl.formatMessage({ defaultMessage: "Max-ad" }), // Max-ed
    description: intl.formatMessage({
      defaultMessage: "Druckit 90 liter must.",
    }),
  },
  unknown: {
    title: intl.formatMessage({ defaultMessage: "Okänd" }),
    description: intl.formatMessage({
      defaultMessage: "Denna utmärkelse finns egentligen inte.",
    }),
  },
});

export const getAchievementTexts = (intl, id: string) => {
  const map = achievements(intl);
  return map[id] ?? map.unknown;
};
