export default function truncate(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }

  const spaceIndex = str.indexOf(' ', maxLength);

  return `${str.slice(0, spaceIndex)}...`;
}
