import React, { ReactElement, useState } from "react";
import { Row, Col } from "antd";
import AlgorithmDecoder from "./AlgorithmDecoder";
import AlgorithmPicker from "./AlgorithmPicker";
import { Algorithm } from "../utils/enums";
import AlgorithmEncoder from "./AlgorithmEncoder";
import { DiffieHellmanChat } from "./DiffieHellmanChat";
import { PasswordProtectionProgram } from "./PasswordProtectionProgram";

export const Main: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.CAESER);

  const algorithPickerWrapper: ReactElement = (
    <Row>
      <Col span={24}>
        <AlgorithmPicker algorithm={algorithm} setAlgorithm={setAlgorithm} />
      </Col>
    </Row>
  );

  if (algorithm === Algorithm.PASSWORD_PROTECTION_PROGRAM) {
    return (
      <div style={{ padding: "1rem" }}>
        {algorithPickerWrapper}
        <Row>
          <Col span={24}>
            <PasswordProtectionProgram />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      {algorithPickerWrapper}
      <Row>
        {algorithm === Algorithm.DIFFIE_HELLMAN ? (
          <Col span={24}>
            <DiffieHellmanChat />
          </Col>
        ) : (
          <>
            <Col span={12} style={{ paddingRight: "0.2rem" }}>
              <AlgorithmEncoder algorithm={algorithm} />
            </Col>
            <Col span={12} style={{ paddingLeft: "0.2rem" }}>
              <AlgorithmDecoder algorithm={algorithm} />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default Main;
