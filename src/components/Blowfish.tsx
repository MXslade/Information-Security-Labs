import React, { useState, useRef, CSSProperties } from "react";
import { Typography, Input, Button } from "antd";
import * as d3 from "d3";
import { blowfishEncode, blowfishDecode } from "../utils/helper";
import { P } from "../utils/blowFishConstants";

const { Text } = Typography;

const defaultStyle: CSSProperties = {
  marginBottom: "1rem",
};

const possibleCharacters = "0123456789abcdef";

const checkForCharacters = (text: string): boolean => {
  for (let i = 0; i < text.length; ++i) {
    if (possibleCharacters.indexOf(text.charAt(i)) === -1) {
      return false;
    }
  }
  return true;
};

const drawText = (
  mainGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  text: string,
  x: number,
  y: number
) => {
  mainGroup
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", x)
    .attr("y", y)
    .attr("font-size", "1rem")
    .text(text);
};

const drawCircle = (
  mainGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  x: number,
  y: number
) => {
  mainGroup
    .append("circle")
    .attr("cx", x)
    .attr("cy", y - 3)
    .attr("r", 15)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", "1px");
};

const drawDiagram = (svg: SVGSVGElement) => {
  const container = d3.select(svg);
  container.selectAll("g").remove();
  const height = parseInt(container.attr("height"));
  const width = parseInt(container.attr("width"));
  const verticalSpacing = 60;
  let startY = 20;

  const mainGroup = container.append("g");
  const plainText = mainGroup
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", startY)
    .attr("font-size", "1rem")
    .text("Plain Text Kekulus");
  console.log(plainText.node()?.getComputedTextLength());

  startY += verticalSpacing;

  const left = mainGroup
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 4)
    .attr("y", startY)
    .attr("font-size", "1rem")
    .text("left part");

  const right = mainGroup
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width - width / 4)
    .attr("y", startY)
    .attr("font-size", "1rem")
    .text("right part");

  startY += verticalSpacing;

  const colWidth = width / 7;

  const xLeft = colWidth + colWidth / 2;
  const xCenter = 3 * colWidth + colWidth / 2;
  const xRight = 5 * colWidth + colWidth / 2;

  const circleRadius = 15;

  for (let i = 0; i < 16; ++i) {
    let yBegin = startY - 10;
    drawText(mainGroup, "L", xLeft, startY);
    drawCircle(mainGroup, xLeft, startY);

    drawText(mainGroup, "Pi", xCenter, startY);
    drawCircle(mainGroup, xCenter, startY);

    drawText(mainGroup, "R", xRight, startY);
    drawCircle(mainGroup, xRight, startY);

    startY += verticalSpacing;

    drawText(mainGroup, "X", xLeft, startY);
    drawCircle(mainGroup, xLeft, startY);

    startY += verticalSpacing;

    drawText(mainGroup, "L", xLeft, startY);
    drawCircle(mainGroup, xLeft, startY);

    drawText(mainGroup, "F", xCenter, startY);
    drawCircle(mainGroup, xCenter, startY);

    drawText(mainGroup, "X", xRight, startY);
    drawCircle(mainGroup, xRight, startY);

    startY += verticalSpacing;

    drawText(mainGroup, "R", xRight, startY);
    drawCircle(mainGroup, xRight, startY);

    startY += verticalSpacing;

    drawText(mainGroup, "L", xLeft, startY);
    drawCircle(mainGroup, xLeft, startY);

    drawText(mainGroup, "R", xRight, startY);
    drawCircle(mainGroup, xRight, startY);

    let yEnd = startY;

    mainGroup
      .append("rect")
      .attr("x", xLeft - 30)
      .attr("y", yBegin - 15)
      .attr("width", xRight - xLeft + 60)
      .attr("height", yEnd - yBegin + 30)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "1px");

    startY += verticalSpacing;
  }
};

export const BlowfishEncode: React.FC = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [encodedText, setEncodedText] = useState<string>("");
  const svg = useRef<SVGSVGElement>(null);

  const handleChangePlainText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.toLowerCase();
    if (value.length > 16 || !checkForCharacters(value)) {
      return;
    }
    setPlainText(value);
  };

  const encode = () => {
    if (plainText.length === 16 && key.length && key.length % 8 === 0) {
      setEncodedText(blowfishEncode(plainText, key));
      if (svg && svg.current) {
        drawDiagram(svg.current);
      }
    }
  };

  return (
    <>
      <Text type="success">Encode</Text>
      <Input
        placeholder="Input your text"
        value={plainText}
        onChange={handleChangePlainText}
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
      <svg ref={svg} height="3400" width="400"></svg>
    </>
  );
};

export const BlowfishDecode: React.FC = () => {
  const [encodedText, setEncodedText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [decodedText, setDecodedText] = useState<string>("");

  const handleChangeEncodedText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.toLowerCase();
    if (value.length > 16 || !checkForCharacters(value)) {
      return;
    }
    setEncodedText(value);
  };

  const decode = () => {
    if (encodedText.length === 16 && key.length && key.length % 8 === 0) {
      setDecodedText(blowfishDecode(encodedText, key));
    }
  };

  return (
    <>
      <Text type="success">Decode</Text>
      <Input
        placeholder="Input your encoded text"
        value={encodedText}
        onChange={handleChangeEncodedText}
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
