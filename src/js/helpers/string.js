export const upperFirst = (string) => {
    return string[0].toUpperCase() + string.slice(1)
  }
  export const maxLength = (string, cut) => {
    return string.slice(40)
  }
  export const fixFilename = (string, cut) => {
    return string.replace(/å/g, 'a')
      .replace(/Å/g, 'A')
      .replace(/ä/g, 'a')
      .replace(/Ä/g, 'A')
      .replace(/ö/g, 'o')
      .replace(/Ö/g, 'O')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .split('(').join('')
      .split(')').join('')
      .split('[').join('')
      .split(']').join('')
      .split(' ').join('_')
  }
  export const isEmpty = (value, checkStringNull=false) => {
    if(checkStringNull) return (value == null || value.length === 0 || value === "null")
    else return (value == null || value.length === 0);
  }
  export default { maxLength, fixFilename, upperFirst,isEmpty }