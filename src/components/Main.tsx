import React, { useState } from "react";
import { Row, Col } from "antd";
import AlgorithmDecoder from "./AlgorithmDecoder";
import AlgorithmPicker from "./AlgorithmPicker";
import { Algorithm } from "../utils/enums";
import AlgorithmEncoder from "./AlgorithmEncoder";

export const Main: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.CAESER);

  return (
    <div style={{ padding: "1rem" }}>
      <Row>
        <Col span={24}>
          <AlgorithmPicker algorithm={algorithm} setAlgorithm={setAlgorithm} />
        </Col>
      </Row>
      <Row>
        <Col span={12} style={{ paddingRight: "0.2rem" }}>
          <AlgorithmEncoder algorithm={algorithm} />
        </Col>
        <Col span={12} style={{ paddingLeft: "0.2rem" }}>
          <AlgorithmDecoder algorithm={algorithm} />
        </Col>
      </Row>
    </div>
  );
};

export default Main;
