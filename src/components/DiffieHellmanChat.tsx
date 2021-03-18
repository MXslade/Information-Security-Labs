import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button } from "antd";
import { diffieHellmanAPI } from "../utils/api";
import { caeserEncode, caeserDecode } from "../utils/helper";
import { Message } from "../utils/interfaces";
import { CaeserDecode } from "./Caeser";

export const DiffieHellmanChat: React.FC = () => {
  const [prime, setPrime] = useState<number | null>(null);
  const [generator, setGenerator] = useState<number | null>(null);
  const [privateKey, setPrivateKey] = useState<number | null>(null);
  const [interlocutorPublicKey, setInterlocutorPublicKey] = useState<
    number | null
  >(null);
  const [publicKey, setPublicKey] = useState<number | null>(null);
  const [sharedSecretKey, setSharedSecretKey] = useState<number | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (prime !== null && generator !== null && privateKey !== null) {
      let result = 1;
      for (let i = 0; i < privateKey; ++i) {
        result *= generator;
        result %= prime;
      }
      setPublicKey(result);
    }
  }, [prime, generator, privateKey]);

  useEffect(() => {
    if (
      interlocutorPublicKey !== null &&
      privateKey !== null &&
      prime !== null
    ) {
      let result = 1;
      for (let i = 0; i < privateKey; ++i) {
        result *= interlocutorPublicKey;
        result %= prime;
      }
      setSharedSecretKey(result);
    }
  }, [interlocutorPublicKey, privateKey, prime]);

  const sendMessage = () => {
    if (sharedSecretKey !== null && messageText) {
      diffieHellmanAPI
        .sendMessage({
          sentTime: Date.now(),
          content: caeserEncode(messageText, sharedSecretKey),
        })
        .then((response) => {
          if (response.status === 200) {
            setMessageText("");
          }
        });
    }
  };

  useEffect(() => {
    if (lastMessage && sharedSecretKey) {
      const item = document.createElement("div");
      item.innerHTML = `<p><strong>${new Date(
        lastMessage.sentTime
      ).toLocaleTimeString()}</strong></p><p>${caeserDecode(
        lastMessage.content,
        sharedSecretKey
      )}</p><hr/>`;
      document.getElementById("chat")?.appendChild(item);
      console.log("chat Item added");
    }
  }, [lastMessage]);

  useEffect(() => {
    setTimeout(() => {
      if (sharedSecretKey !== null) {
        diffieHellmanAPI.getLastMessage().then((response) => {
          if (response.status === 200) {
            const last: Message = response.data;
            if (lastMessage === null) {
              console.log("1");
              setLastMessage(last);
            }
            if (
              lastMessage !== null &&
              lastMessage.sentTime !== last.sentTime
            ) {
              console.log("2");
              setLastMessage(last);
            }
          }
        });
      }
      setCounter(counter + 1);
    }, 2000);
  }, [sharedSecretKey, counter]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <p>Prime P</p>
          <Input
            type="number"
            placeholder="Input Prime P"
            value={prime ? prime : ""}
            onChange={(event) => setPrime(parseInt(event.target.value))}
          />
        </Col>
        <Col span={6}>
          <p>Generator</p>
          <Input
            type="number"
            placeholder="Input Generator"
            value={generator ? generator : ""}
            onChange={(event) => setGenerator(parseInt(event.target.value))}
          />
        </Col>
        <Col span={6}>
          <p>Private Key</p>
          <Input
            type="number"
            placeholder="Input Private Key"
            value={privateKey ? privateKey : ""}
            onChange={(event) => setPrivateKey(parseInt(event.target.value))}
          />
        </Col>
        <Col span={6}>
          <p>Interlocutor Public Key</p>
          <Input
            type="number"
            placeholder="Input Interlocutor Public Key"
            value={interlocutorPublicKey ? interlocutorPublicKey : ""}
            onChange={(event) =>
              setInterlocutorPublicKey(parseInt(event.target.value))
            }
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <p>Your Public Key</p>
          <Input
            contentEditable={false}
            type="number"
            value={publicKey ? publicKey : ""}
          />
        </Col>
        <Col span={6}>
          <p>Shared Secret Key</p>
          <Input
            contentEditable={false}
            type="number"
            value={sharedSecretKey ? sharedSecretKey : ""}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <div
            id="chat"
            style={{
              width: "100%",
              height: "20rem",
              backgroundColor: "white",
              overflowY: "scroll",
            }}
          ></div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={20}>
          <Input
            placeholder="Input your message"
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />
        </Col>
        <Col span={4}>
          <Button
            style={{ width: "100%" }}
            disabled={sharedSecretKey === null}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Col>
      </Row>
    </>
  );
};
