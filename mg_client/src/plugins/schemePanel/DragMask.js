import React, { useState } from "react";
import * as access from "../access";
import styled from "styled-components";


import Center from "../Layouts/Center";
import Label from "../tools/Label";
import Mask from "../tools/Mask";

const RoundWrapper = styled('div')`
  width: 285px;
  height: 285px;
  overflow: hidden;
  background: ${access.color("backgrounds.primary")};
  color: ${access.color("texts.primary")};
  border-radius: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
`;

function DragMask({ text }) {
  const [background, setBackground] = useState("transparent");
  const [open, setOpen] = useState(false);

  const handleOnMouseEnter = e => {
    setBackground(access.color("schemePanel.bg"));
    setOpen(true);
  };

  const handleOnMouseLeave = e => {
    setBackground("transparent");
    setOpen(false);
  };

  const renderAddIcon = () => {
    if (!open) return null;

    return (
      <Center>
        <RoundWrapper>
          <Label fontSize={"30px"} weight={700} style={{maxWidth:'250px'}}>
            {text}
          </Label>
        </RoundWrapper>
      </Center>
    );
  };

  return (
    <Mask
      opacity={0.8}
      mask={background}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      style={{ transition: `background 250ms` }}
    >
      {renderAddIcon()}
    </Mask>
  );
}

export default DragMask;
