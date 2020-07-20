export default function getContainerCode(text: string): any {
  if (!text) return false;

  if (typeof text !== 'string') return false;

  const alphabet: { [letter: string]: number } = {
    'A': 10, 'B': 12, 'C': 13, 'D': 14, 'E': 15, 'F': 16, 'G': 17, 'H': 18, 'I': 19,
    'J': 20, 'K': 21, 'L': 23, 'M': 24, 'N': 25, 'O': 26, 'P': 27, 'Q': 28, 'R': 29,
    'S': 30, 'T': 31, 'U': 32, 'V': 34, 'W': 35, 'X': 36, 'Y': 37, 'Z': 38
  };
  
  text = text.toUpperCase();

  const ISO_6346 = /((?:[a-zA-Z]{4}|\{4})[ ]{0,}[0-9]{6}[ ]{0,}[-]{0,1}[0-9]{1})/;
  let isISOFormat = ISO_6346.test(text);
  let result = text.match(ISO_6346);
  if(!result){
    text = text.replace(/\s/g,'');
    isISOFormat = ISO_6346.test(text);
    result = text.match(ISO_6346);
  } 
  
  const code = result && result.length ? result[0].replace(/\s/g,'').replace('-', '') : null;

  console.log('=================================================================')
  console.log('TEXT: ', text)
  console.log('RESULT: ', result)
  console.log('CODE: ', code)
  console.log('CODE LENGTH: ', code ? code.length : null)
  console.log('isISOFormat: ', isISOFormat)
  

  const invalidLenght = code && code.length !== 11;

  if (invalidLenght || !isISOFormat) return false;

  let sum = 0;
  const checkDigit = code.substr(10);

  code
    .substr(0, 10)
    .split('')
    .map((char: string, index: number) => {
      let n = Number(char);

      if (index < 4) n = alphabet[char];

      n *= Math.pow(2, index);

      sum += n;
    });

  sum %= 11;
  sum %= 10;

  console.log('SUM: ', sum)
  console.log('checkDigit: ', checkDigit)

  const isContainerValid = sum === Number(checkDigit);

  console.log('isContainerValid: ', isContainerValid)
  console.log('=================================================================')

  return isContainerValid ? code : null;
}
