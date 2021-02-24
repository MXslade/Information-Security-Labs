import { Result } from "antd";
import { P as defaultP, S, modVal } from "./blowFishConstants";
import { IRSAEncode } from "./interfaces";

export const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
let P = defaultP.slice();

export const caeserEncode = (plainText: string, key: number): string => {
  let text = plainText.toLowerCase().replaceAll(" ", "");
  let encoded = "";
  for (let i = 0; i < text.length; ++i) {
    let index = alphabet.indexOf(text.charAt(i));
    index = (index + key) % alphabet.length;
    encoded += alphabet.charAt(index);
  }
  return encoded;
};

export const caeserDecode = (encodedText: string, key: number): string => {
  let text = encodedText.toLowerCase().replaceAll(" ", "");
  let decoded = "";
  for (let i = 0; i < text.length; ++i) {
    let index = alphabet.indexOf(text.charAt(i));
    index =
      (index - (key % alphabet.length) + alphabet.length) % alphabet.length;
    decoded += alphabet.charAt(index);
  }
  return decoded;
};

export const vigenereEncode = (plainText: string, key: string): string => {
  let text = plainText.toLowerCase().replaceAll(" ", "");
  key = key.toLowerCase().replaceAll(" ", "");
  let encoded = "";
  for (let i = 0; i < text.length; ++i) {
    let indexText = alphabet.indexOf(text.charAt(i));
    let indexKey = alphabet.indexOf(key.charAt(i % key.length));
    encoded += alphabet.charAt((indexText + indexKey) % alphabet.length);
  }
  return encoded;
};

export const vigenereDecode = (encodedText: string, key: string): string => {
  let text = encodedText.toLowerCase().replaceAll(" ", "");
  key = key.toLowerCase().replaceAll(" ", "");
  let decoded = "";
  for (let i = 0; i < text.length; ++i) {
    let indexText = alphabet.indexOf(text.charAt(i));
    let indexKey = alphabet.indexOf(key.charAt(i % key.length));
    decoded += alphabet.charAt(
      (indexText - indexKey + alphabet.length) % alphabet.length
    );
  }
  return decoded;
};

const generatePlayfairKey = (key: string): string => {
  key = key.replaceAll("j", "i");
  let alphabetCopy = alphabet.replaceAll("j", "i");
  let result: string = "";

  for (let i = 0; i < key.length; ++i) {
    if (result.indexOf(key.charAt(i)) === -1) {
      result += key.charAt(i);
    }
  }

  for (let i = 0; i < alphabetCopy.length; ++i) {
    if (result.indexOf(alphabetCopy.charAt(i)) === -1) {
      result += alphabetCopy.charAt(i);
    }
  }

  return result;
};

const getRow = (value: number): number => {
  return Math.floor(value / 5);
};

const getColumn = (value: number): number => {
  return value % 5;
};

export const playfairEncode = (plainText: string, key: string): string => {
  let text = plainText.toLowerCase().replaceAll(" ", "").replaceAll("j", "i");
  key = generatePlayfairKey(key.toLowerCase().replaceAll(" ", ""));

  if (text.length % 2 !== 0) {
    text += "x";
  }

  let encoded = "";

  for (let i = 1; i < text.length; i += 2) {
    let first = text.charAt(i - 1);
    let second = text.charAt(i);
    second = first === second ? "x" : second;

    let firstIndex = key.indexOf(first);
    let secondIndex = key.indexOf(second);

    if (getRow(firstIndex) === getRow(secondIndex)) {
      firstIndex = getRow(firstIndex) * 5 + ((getColumn(firstIndex) + 1) % 5);
      secondIndex =
        getRow(secondIndex) * 5 + ((getColumn(secondIndex) + 1) % 5);
    } else if (getColumn(firstIndex) === getColumn(secondIndex)) {
      firstIndex = ((getRow(firstIndex) + 1) % 5) * 5 + getColumn(firstIndex);
      secondIndex =
        ((getRow(secondIndex) + 1) % 5) * 5 + getColumn(secondIndex);
    } else {
      const prevFirstCol = getColumn(firstIndex);
      const prevSecondCol = getColumn(secondIndex);
      firstIndex = getRow(firstIndex) * 5 + prevSecondCol;
      secondIndex = getRow(secondIndex) * 5 + prevFirstCol;
    }

    encoded += key.charAt(firstIndex) + key.charAt(secondIndex);
  }

  return encoded;
};

export const playfairDecode = (encodedText: string, key: string): string => {
  let text = encodedText.toLowerCase().replaceAll(" ", "").replaceAll("j", "i");
  key = generatePlayfairKey(key.toLowerCase().replaceAll(" ", ""));

  let decoded = "";

  for (let i = 1; i < text.length; i += 2) {
    let first = text.charAt(i - 1);
    let second = text.charAt(i);

    let firstIndex = key.indexOf(first);
    let secondIndex = key.indexOf(second);

    if (getRow(firstIndex) === getRow(secondIndex)) {
      firstIndex =
        getRow(firstIndex) * 5 + ((getColumn(firstIndex) - 1 + 5) % 5);
      secondIndex =
        getRow(secondIndex) * 5 + ((getColumn(secondIndex) - 1 + 5) % 5);
    } else if (getColumn(firstIndex) === getColumn(secondIndex)) {
      firstIndex =
        ((getRow(firstIndex) - 1 + 5) % 5) * 5 + getColumn(firstIndex);
      secondIndex =
        ((getRow(secondIndex) - 1 + 5) % 5) * 5 + getColumn(secondIndex);
    } else {
      const prevFirstCol = getColumn(firstIndex);
      const prevSecondCol = getColumn(secondIndex);
      firstIndex = getRow(firstIndex) * 5 + prevSecondCol;
      secondIndex = getRow(secondIndex) * 5 + prevFirstCol;
    }

    decoded += key.charAt(firstIndex) + key.charAt(secondIndex);
  }
  return decoded;
};

const swapChars = (text: string, i: number, j: number): string => {
  const p1 = text.substr(0, i);
  const p2 = text.substr(i + 1, j - i - 1);
  const p3 = text.substr(j + 1);
  return p1 + text.charAt(j) + p2 + text.charAt(i) + p3;
};

export const transpositionEncode = (plainText: string, key: string): string => {
  let text = plainText.toLowerCase().replaceAll(" ", "");
  key = key.toLowerCase().replaceAll(" ", "");

  const leftChars =
    text.length % key.length ? key.length - (text.length % key.length) : 0;
  for (let i = 0; i < leftChars; ++i) {
    text += "x";
  }

  const rows = text.length / key.length;
  let encoded = "";
  const cols: string[] = new Array(key.length).fill("");

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < key.length; ++j) {
      cols[j] += text.charAt(i * key.length + j);
    }
  }

  for (let i = 0; i < key.length - 1; ++i) {
    for (let j = i + 1; j < key.length; ++j) {
      if (key.charAt(i) > key.charAt(j)) {
        key = swapChars(key, i, j);
        const temp = cols[i];
        cols[i] = cols[j];
        cols[j] = temp;
      }
    }
  }

  cols.forEach((col) => {
    encoded += col;
  });

  return encoded;
};

export const transpositionDecode = (
  encodedText: string,
  key: string
): string => {
  let text = encodedText.replaceAll(" ", "");
  key = key.toLowerCase().replaceAll(" ", "");

  const rows = text.length / key.length;
  let decoded = "";
  const cols: string[] = new Array(key.length).fill("");

  for (let i = 0; i < key.length; ++i) {
    for (let j = 0; j < rows; ++j) {
      cols[i] += text.charAt(i * rows + j);
    }
  }

  let keyCopy = key.slice();

  for (let i = 0; i < keyCopy.length - 1; ++i) {
    for (let j = i + 1; j < keyCopy.length; ++j) {
      if (keyCopy.charAt(i) > key.charAt(j)) {
        keyCopy = swapChars(keyCopy, i, j);
      }
    }
  }

  const colsReplaced: string[] = new Array(key.length);

  for (let i = 0; i < keyCopy.length; ++i) {
    let index = key.indexOf(keyCopy.charAt(i));
    colsReplaced[index] = cols[i];
  }

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < key.length; ++j) {
      decoded += colsReplaced[j].charAt(i);
    }
  }

  return decoded;
};

const hexToBin = (plainText: string): string => {
  let binary = "";
  const n = plainText.length;
  for (let i = 0; i < n; ++i) {
    let num = parseInt(plainText.charAt(i) + "", 16);
    let binary4B = num.toString(2);
    binary4B = "0000" + binary4B;
    binary4B = binary4B.substr(binary4B.length - 4);
    binary += binary4B;
  }
  return binary;
};

const binToHex = (plainText: string): string => {
  const num = parseInt(plainText, 2);
  let hex = num.toString(16);
  while (hex.length < plainText.length / 4) {
    hex = "0" + hex;
  }
  return hex;
};

const xor = (a: string, b: string): string => {
  a = hexToBin(a);
  b = hexToBin(b);
  let ans = "";
  for (let i = 0; i < a.length; ++i) {
    ans += String.fromCharCode(
      ((a.charAt(i).charCodeAt(0) - "0".charCodeAt(0)) ^
        (b.charAt(i).charCodeAt(0) - "0".charCodeAt(0))) +
        "0".charCodeAt(0)
    );
  }
  ans = binToHex(ans);
  return ans;
};

const addBin = (a: string, b: string): string => {
  let ans = "";
  let n1 = parseInt(a, 16);
  let n2 = parseInt(b, 16);
  n1 = (n1 + n2) % modVal;
  ans = n1.toString(16);
  ans = "00000000" + ans;
  return ans.substr(ans.length - 8);
};

const f = (plainText: string): string => {
  const a: string[] = Array(4);
  let ans = "";
  for (let i = 0; i < 8; i += 2) {
    const col = parseInt(hexToBin(plainText.substr(i, 2)), 2);
    a[Math.floor(i / 2)] = S[Math.floor(i / 2)][col];
  }
  ans = addBin(a[0], a[1]);
  ans = xor(ans, a[2]);
  ans = addBin(ans, a[3]);
  return ans;
};

const keyGenerate = (key: string) => {
  let j = 0;
  for (let i = 0; i < P.length; ++i) {
    P[i] = xor(P[i], key.substr(j, 8));

    console.log(`subkey ${i + 1} : ${P[i]}`);

    j = (j + 8) % key.length;
  }
};

const round = (time: number, plainText: string): string => {
  let left = plainText.substr(0, 8);
  let right = plainText.substr(8, 8);
  left = xor(left, P[time]);

  const fOut = f(left);

  right = xor(fOut, right);

  console.log(`round ${time} : ${right + left}`);

  return right + left;
};

export const blowfishEncode = (plainText: string, key: string): string => {
  P = defaultP.slice();
  keyGenerate(key);
  for (let i = 0; i < 16; ++i) {
    plainText = round(i, plainText);
  }
  let right = plainText.substr(0, 8);
  let left = plainText.substr(8, 8);
  right = xor(right, P[16]);
  left = xor(left, P[17]);
  return left + right;
};

export const blowfishDecode = (encodedText: string, key: string): string => {
  P = defaultP.slice();
  keyGenerate(key);
  for (let i = 17; i > 1; --i) {
    encodedText = round(i, encodedText);
  }
  let right = encodedText.substr(0, 8);
  let left = encodedText.substr(8, 8);
  right = xor(right, P[1]);
  left = xor(left, P[0]);
  return left + right;
};

const gcd = (a: number, b: number): number => {
  while (1) {
    let temp = a % b;
    if (temp === 0) {
      return b;
    }
    a = b;
    b = temp;
  }
  return -1;
};

const bigIntPow = (a: bigint, b: number): bigint => {
  let result = BigInt(1);
  for (let i = 0; i < b; ++i) {
    result *= a;
  }
  return result;
};

export const rsaEncode = (
  plainText: string,
  p: number,
  q: number
): IRSAEncode => {
  let text = plainText.replaceAll(" ", "");
  const n = p * q;
  let e = 2;
  const phi = (p - 1) * (q - 1);

  while (e < phi) {
    if (gcd(e, phi) === 1) {
      break;
    } else {
      ++e;
    }
  }

  const k = 2;
  const d = (1 + k * phi) / e;

  let result = "";
  const encodedNumbers: number[] = [];

  for (let i = 0; i < plainText.length; ++i) {
    let index = alphabet.indexOf(plainText.charAt(i));
    let c = bigIntPow(BigInt(index), e) % BigInt(n);
    encodedNumbers.push(parseInt(c.toString()));
    result += c + " ";
  }

  return {
    encodedText: result,
    encodedNumbers: encodedNumbers,
    n: n,
    e: e,
    phi: phi,
    k: k,
    d: d,
  };
};

export const rsaDecode = (
  encodedText: string,
  p: number,
  q: number
): string => {
  const encodedNumbers = encodedText
    .trim()
    .split(" ")
    .map((item) => parseInt(item));

  console.log(encodedNumbers);

  const n = p * q;
  let e = 2;
  const phi = (p - 1) * (q - 1);

  while (e < phi) {
    if (gcd(e, phi) === 1) {
      break;
    } else {
      ++e;
    }
  }

  const k = 2;
  const d = (1 + k * phi) / e;

  let result = "";

  encodedNumbers.forEach((item) => {
    let m = bigIntPow(BigInt(item), d) % BigInt(n);
    result += alphabet.charAt(parseInt(m.toString()));
  });

  return result;
};
