import React, { CSSProperties, useState } from "react";
import { Typography, Input, Button } from "antd";
import { transpositionEncode, transpositionDecode } from "../utils/helper";

const { Text } = Typography;

const defaultStyle: CSSProperties = {
  marginBottom: "1rem",
};

export const TranspositionEncode: React.FC = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [encodedText, setEncodedText] = useState<string>("");

  const encode = () => {
    if (plainText.length && key.length) {
      setEncodedText(transpositionEncode(plainText, key));
    }
  };

  const handleOnKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let valueWithUniqueChars = "";
    for (let i = 0; i < value.length; ++i) {
      if (valueWithUniqueChars.indexOf(value.charAt(i)) === -1) {
        valueWithUniqueChars += value.charAt(i);
      }
    }
    setKey(valueWithUniqueChars);
  };

  return (
    <>
      <Text type="success">Encode</Text>
      <Input
        placeholder="Input your text"
        value={plainText}
        onChange={(event) => setPlainText(event.target.value)}
        style={defaultStyle}
      />
      <Input
        placeholder="Input your key"
        value={key ? key : ""}
        onChange={handleOnKeyChange}
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

export const TranspositionDecode: React.FC = () => {
  const [encodedText, setEncodedText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [decodedText, setDecodedText] = useState<string>("");

  const decode = () => {
    if (encodedText.length && key.length) {
      setDecodedText(transpositionDecode(encodedText, key));
    }
  };

  const handleOnKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let valueWithUniqueChars = "";
    for (let i = 0; i < value.length; ++i) {
      if (valueWithUniqueChars.indexOf(value.charAt(i)) === -1) {
        valueWithUniqueChars += value.charAt(i);
      }
    }
    setKey(valueWithUniqueChars);
  };

  return (
    <>
      <Text type="success">Decode</Text>
      <Input
        placeholder="Input your encoded text"
        value={encodedText}
        onChange={(event) => setEncodedText(event.target.value)}
        style={defaultStyle}
      />
      <Input
        placeholder="Input your key"
        value={key ? key : ""}
        onChange={handleOnKeyChange}
        style={defaultStyle}
      />
      <Button type="primary" style={defaultStyle} onClick={() => decode()}>
        Decode
      </Button>
      <div>
        <Text>Decoded Text</Text>
        <Input
          placeholder="Your decoded text"
          value={decodedText}
          contentEditable={false}
        />
      </div>
    </>
  );
};
