import React from "react";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
import { Algorithm } from "../utils/enums";

interface Props {
  setAlgorithm(algorithm: Algorithm): any;
  algorithm: Algorithm;
}

export const AlgorithmPicker: React.FC<Props> = ({
  setAlgorithm,
  algorithm,
}) => {
  const { Option } = Select;

  const handleOnChange = (value: SelectValue) => {
    Object.values(Algorithm).forEach((algo) => {
      if (algo.toString() === value) {
        setAlgorithm(algo);
        return;
      }
    });
  };

  return (
    <div>
      <Select
        showSearch={true}
        style={{ width: "100%", marginBottom: "1rem" }}
        placeholder="Select an algorithm"
        onChange={handleOnChange}
        filterOption={(input, option) =>
          option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue={algorithm.toString()}
      >
        {Object.values(Algorithm).map((algo) => (
          <Option key={algo} value={algo.toString()}>
            {algo.toString()}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AlgorithmPicker;
