import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { sha512 } from "js-sha512";
import { getHalfPassword } from "../utils/passwordProtectionConstants";
import { passwordProtectionAPI } from "../utils/api";

export const PasswordProtectionProgram: React.FC = () => {
  const [password, setPassword] = useState<string>("");

  const handleGetFileClick = () => {
    const hashed = sha512(password);
    if (hashed.substr(0, Math.floor(hashed.length / 2)) !== getHalfPassword()) {
      message.error("Access denied!");
    } else {
      passwordProtectionAPI
        .authenticate(hashed)
        .then((response) => {
          if (response.status === 200) {
            message.success("Access Granted!");
          }
        })
        .catch((error) => {
          message.error("Access denied!");
        });
    }
  };

  return (
    <div
      style={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontSize: "1.5rem",
          backgroundColor: "#001529",
          padding: "1rem",
          color: "white",
        }}
      >
        Password Protection Program
      </p>
      <Input
        type="password"
        placeholder="Input password"
        style={{ width: "40%", marginBottom: "1rem" }}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="primary" onClick={handleGetFileClick}>
        Get File
      </Button>
    </div>
  );
};
