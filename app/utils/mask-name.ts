const maskName = (name: string) => {
  if (!name) return "-";
  const nameParts = name.split(" ");
  const maskedName = nameParts
    .map((part) => part.charAt(0) + "*".repeat(part.length - 1))
    .join(" ");
  return maskedName;
};

export default maskName;
