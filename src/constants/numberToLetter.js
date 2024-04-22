export function numberToLetter(number) {
    if (number >= 1 && number <= 26) {
      const charCode = number + 96;
      const letter = String.fromCharCode(charCode).toUpperCase();
      return letter;
    } else {
      return "Invalid number";
    }
  }