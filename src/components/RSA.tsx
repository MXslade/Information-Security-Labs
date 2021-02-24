import React, { useState, CSSProperties } from "react";
import { Typography, Input, Button } from "antd";
import { rsaEncode, rsaDecode } from "../utils/helper";

const { Text } = Typography;

const defaultStyle: CSSProperties = {
  marginBottom: "1rem",
};

export const RSAEncode: React.FC = () => {
  const [plainNumber, setPlainNumber] = useState<number>();
  const [p, setP] = useState<number>();
  const [q, setQ] = useState<number>();
  const [encodedText, setEncodedText] = useState<string>("");

  const encode = () => {
    if (plainNumber && p && q) {
      setEncodedText(rsaEncode(plainNumber, p, q).toString());
    }
  };

  return (
    <>
      <Text type="success">Encode</Text>
      <Input
        placeholder="Input your plain number"
        value={plainNumber}
        onChange={(event) => setPlainNumber(parseInt(event.target.value))}
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
    </>
  );
};

export const RSADecode: React.FC = () => {
  const [encodedNumber, setEncodedNumber] = useState<number>();
  const [p, setP] = useState<number>();
  const [q, setQ] = useState<number>();
  const [decodedText, setDecodedText] = useState<string>("");

  const decode = () => {
    if (encodedNumber && p && q) {
      setDecodedText(rsaDecode(encodedNumber, p, q).toString());
    }
  };

  return (
    <>
      <Text type="success">Decode</Text>
      <Input
        placeholder="Input your encoded number"
        value={encodedNumber}
        onChange={(event) => setEncodedNumber(parseInt(event.target.value))}
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
