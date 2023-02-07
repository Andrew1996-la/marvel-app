export const charValidation = (char) => {
  if (char.description === "") {
    char.description = "there is no description of this hero";
  }
  if (char.description.length > 200) {
    char.description = char.description.slice(0, 220) + "...";
  }
  return char;
};
