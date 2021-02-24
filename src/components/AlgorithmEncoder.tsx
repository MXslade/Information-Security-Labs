import React from "react";
import { Algorithm } from "../utils/enums";
import { CaeserEncode } from "./Caeser";
import { VigenereEncode } from "./Vigenere";
import { PlayfairEncode } from "./Playfair";
import { TranspositionEncode } from "./Transposition";
import { BlowfishEncode } from "./Blowfish";
import { AESEncode } from "./AES";
import { RSAEncode } from "./RSA";

interface Props {
  algorithm: Algorithm;
}

export const AlgorithmEncoder: React.FC<Props> = ({ algorithm }) => {
  if (algorithm === Algorithm.CAESER) {
    return <CaeserEncode />;
  } else if (algorithm === Algorithm.VIGENERE) {
    return <VigenereEncode />;
  } else if (algorithm === Algorithm.PLAYFAIR) {
    return <PlayfairEncode />;
  } else if (algorithm === Algorithm.TRANSPOSITION) {
    return <TranspositionEncode />;
  } else if (algorithm === Algorithm.BLOWFISH) {
    return <BlowfishEncode />;
  } else if (algorithm === Algorithm.RSA) {
    return <RSAEncode />;
  } else if (algorithm === Algorithm.AES) {
    return <AESEncode />;
  }
  return <div></div>;
};

export default AlgorithmEncoder;
