export function toTitleCase(str): string {
  return str.replace(/\S\S*/g, function (txt: string): string {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
