export const toTitleCase = (str: string) => {
  if (typeof str === "string")
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0)?.toUpperCase() + txt.substr(1);
    });
  return str;
};

export const convertSnakeCaseToTitleCase = (text: string) => {
  return toTitleCase(text.split(/[_-]/).join(" "));
};
