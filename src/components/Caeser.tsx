import React, { CSSProperties, useState } from "react";
import { Input, Typography, Button } from "antd";
import { caeserEncode, caeserDecode } from "../utils/helper";

const { Text } = Typography;

const defaultStyle: CSSProperties = {
  marginBottom: "1rem",
};

export const CaeserEncode: React.FC = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [key, setKey] = useState<number | null>(null);
  const [encodedText, setEncodedText] = useState<string>("");

  const encode = () => {
    if (plainText.length && key) {
      setEncodedText(caeserEncode(plainText, key));
    }
  };

  const onKeyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKey(value.length ? parseInt(value) : null);
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
        type="number"
        onChange={onKeyChanged}
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

export const CaeserDecode: React.FC = () => {
  const [encodedText, setEncodedText] = useState<string>("");
  const [key, setKey] = useState<number | null>(null);
  const [decodedText, setDecodedText] = useState<string>("");

  const decode = () => {
    if (encodedText.length && key) {
      setDecodedText(caeserDecode(encodedText, key));
    }
  };

  const onKeyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKey(value.length ? parseInt(value) : null);
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
        type="number"
        onChange={onKeyChanged}
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
