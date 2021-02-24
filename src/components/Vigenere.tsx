import React, { useState, CSSProperties } from "react";
import { Typography, Input, Button } from "antd";
import { vigenereEncode, vigenereDecode } from "../utils/helper";

const { Text } = Typography;

const defaultStyle: CSSProperties = {
  marginBottom: "1rem",
};

export const VigenereEncode: React.FC = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [encodedText, setEncodedText] = useState<string>("");

  const encode = () => {
    if (plainText.length && key.length) {
      setEncodedText(vigenereEncode(plainText, key));
    }
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
        onChange={(event) => setKey(event.target.value)}
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

export const VigenereDecode: React.FC = () => {
  const [encodedText, setEncodedText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [decodedText, setDecodedText] = useState<string>("");

  const decode = () => {
    if (encodedText.length && key.length) {
      setDecodedText(vigenereDecode(encodedText, key));
    }
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
        onChange={(event) => setKey(event.target.value)}
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
