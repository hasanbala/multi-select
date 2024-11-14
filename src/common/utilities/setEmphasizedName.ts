export const setEmphasizedName = (emphasizedText: string, name: string) => {
  if (emphasizedText) {
    const text = name.replace(
      new RegExp(emphasizedText + "(?!([^<]+)?<)", "gi"),
      "<b>$&</b>"
    );

    return text;
  }

  return null;
};
