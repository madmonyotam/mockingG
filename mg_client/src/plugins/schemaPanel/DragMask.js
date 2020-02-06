import React, { useState } from "react";
import * as access from "plugins/access";
import styled from "styled-components";


import Center from "plugins/Layouts/Center";
import Label from "plugins/tools/Label";
import Mask from "plugins/tools/Mask";

const RoundWrapper = styled('div')`
  width: ${p => !p.open ? '0px' : '285px'};
  height: ${p => !p.open ? '0px' : '285px'};
  overflow: hidden;
  background: ${access.color("backgrounds.primary")};
  color: ${access.color("texts.primary")};
  border-radius: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: all 250ms;
`;

function DragMask({ text }) {
  const [open, setOpen] = useState(false);

  const handleOnMouseEnter = e => {
    setOpen(true);
  };

  const handleOnMouseLeave = e => {
    setOpen(false);
  };

  const renderAdd = () => {
    return (
      <Center>
        <RoundWrapper open={open}>
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
      mask={access.color("schemaPanel.bg")}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      style={{ transition: `background 250ms` }}
    >
      {renderAdd()}
    </Mask>
  );
}

export default DragMask;
