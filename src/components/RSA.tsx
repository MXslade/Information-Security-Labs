import React, { useState, CSSProperties } from "react";
import { Typography, Input, Button } from "antd";
import { rsaEncode, rsaDecode, alphabet } from "../utils/helper";
import { IRSAEncode } from "../utils/interfaces";

const { Text } = Typography;

const defaultStyle: CSSProperties = {
  marginBottom: "1rem",
};

export const RSAEncode: React.FC = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [p, setP] = useState<number>();
  const [q, setQ] = useState<number>();
  const [encodedText, setEncodedText] = useState<string>("");
  const [result, setResult] = useState<IRSAEncode>();

  const encode = () => {
    if (plainText && p && q) {
      const temp = rsaEncode(plainText, p, q);
      setEncodedText(temp.encodedText);
      setResult(temp);
    }
  };

  return (
    <>
      <Text type="success">Encode</Text>
      <Input
        placeholder="Input your plain number"
        value={plainText}
        onChange={(event) => setPlainText(event.target.value)}
        style={defaultStyle}
      />
      <Input
        placeholder="Input your first prime number (p)"
        type="number"
        value={p}
        onChange={(event) => setP(parseInt(event.target.value))}
        style={defaultStyle}
      />
      <Input
        placeholder="Input your second prime number (q)"
        type="number"
        value={q}
        onChange={(event) => setQ(parseInt(event.target.value))}
        style={defaultStyle}
      />
      <Button type="primary" style={defaultStyle} onClick={() => encode()}>
        Encode
      </Button>
      <div>
        <Text>Encoded Text</Text>
        <Input
          placeholder="Your encoded text"
          value={encodedText}
          contentEditable={false}
        />
      </div>
      {result && p && q && (
        <div>
          <p>
            n = p * q = {p} * {q} = {result.n}
          </p>
          <p>
            Φ(n) = (P-1)(Q-1) = {p - 1} * {q - 1} = {result.phi}
          </p>
          <p>
            1 {"<"} e {"<"} Φ(n)
          </p>
          <p>e = {result.e}</p>
          <p>k = {result.k}</p>
          <p>
            d = (k*Φ(n) + 1) / e = ({result.k} * {result.phi} + 1) / {result.e}{" "}
            = {result.d}
          </p>
          <p>
            <strong>
              Public Key: ({result.n} and {result.e})
            </strong>
          </p>
          <p>
            <strong>
              Private Key: ({result.n} and {result.d})
            </strong>
          </p>
          {result.encodedNumbers.map((item, index) => (
            <p key={index}>
              {plainText.charAt(index)} ^ e mod n ={" "}
              {alphabet.indexOf(plainText.charAt(index))} ^ {result.e} mod{" "}
              {result.n} = {item}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export const RSADecode: React.FC = () => {
  const [encodedText, setEncodedText] = useState<string>("");
  const [p, setP] = useState<number>();
  const [q, setQ] = useState<number>();
  const [decodedText, setDecodedText] = useState<string>("");

  const decode = () => {
    if (encodedText && p && q) {
      setDecodedText(rsaDecode(encodedText, p, q));
    }
  };

  return (
    <>
      <Text type="success">Decode</Text>
      <Input
        placeholder="Input your encoded numbers"
        value={encodedText}
        onChange={(event) => setEncodedText(event.target.value)}
        style={defaultStyle}
      />
      <Input
        placeholder="Input your first prime number (p)"
        type="number"
        value={p}
        onChange={(event) => setP(parseInt(event.target.value))}
        style={defaultStyle}
      />
      <Input
        placeholder="Input your second prime number (q)"
        type="number"
        value={q}
        onChange={(event) => setQ(parseInt(event.target.value))}
        style={defaultStyle}
      />
      <Button type="primary" style={defaultStyle} onClick={() => decode()}>
        Decode
      </Button>
      <div>
        <Text>Decoded Text</Text>
        <Input
          placeholder="Your encoded text"
          value={decodedText}
          contentEditable={false}
        />
      </div>
    </>
  );
};
