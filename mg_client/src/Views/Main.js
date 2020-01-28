import React, { useState, useEffect } from "react";
import { useBranch } from "baobab-react/hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";

import * as access from "plugins/access";

import MenuPanel from "Views/MenuPanel";
import SchemePanel from "Views/SchemePanel";
import Mask from "plugins/tools/Mask";
import MainCanvas from "plugins/canvases/MainCanvas";
import Menu from "plugins/menuModal/Menu";

const InitMask = styled(Mask)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Main() {
  const { viewKey } = useBranch({ viewKey: ["viewKey"] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(t);
    };
  }, []);

  if (loading) {
    return (
      <InitMask opacity={1} mask={access.color("backgrounds.secondary")}>
        <img alt="logo" src={process.env.PUBLIC_URL + "/gen_logo.png"} />
        <div style={{ width: 400 }}>
          <LinearProgress value={50} color={"primary"} />
        </div>
      </InitMask>
    );
  }

  return (
    <Mask
      opacity={1}
      mask={access.color("backgrounds.secondary")}
      style={{ display: "flex" }}
    >
      <MenuPanel viewKey={viewKey} />
      <SchemePanel />
      <MainCanvas key={viewKey} />
      <Menu />
    </Mask>
  );
}

export default Main;
