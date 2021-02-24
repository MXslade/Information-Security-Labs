import React from "react";
import { Algorithm } from "../utils/enums";
import { CaeserDecode } from "./Caeser";
import { VigenereDecode } from "./Vigenere";
import { PlayfairDecode } from "./Playfair";
import { TranspositionDecode } from "./Transposition";
import { BlowfishDecode } from "./Blowfish";
import { RSADecode } from "./RSA";

interface Props {
  algorithm: Algorithm;
}

export const AlgorithmDecoder: React.FC<Props> = ({ algorithm }) => {
  if (algorithm === Algorithm.CAESER) {
    return <CaeserDecode />;
  } else if (algorithm === Algorithm.VIGENERE) {
    return <VigenereDecode />;
  } else if (algorithm === Algorithm.PLAYFAIR) {
    return <PlayfairDecode />;
  } else if (algorithm === Algorithm.TRANSPOSITION) {
    return <TranspositionDecode />;
  } else if (algorithm === Algorithm.RSA) {
    return <RSADecode />;
  } else if (algorithm === Algorithm.BLOWFISH) {
    return <BlowfishDecode />;
  }
  return <div>Decode</div>;
};

export default AlgorithmDecoder;
