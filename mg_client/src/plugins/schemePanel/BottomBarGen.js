import React, { useState } from "react";
import { useBranch } from "baobab-react/hooks";

import { generate } from "../../tree/actions/items";
import * as access from "../access";

import styled from "styled-components";
import Row from "../Layouts/Row";
import FileDownloader from "../tools/FileDownloader";

import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const BottomBar = styled(Row)`
  justify-content: flex-end;
`;

const ButtonsCont = styled(Row)`
  padding-left: 10px;
`;

const AmountInput = styled("input")`
  width: 60px;
  margin-left: 25px;
  padding: 0px 5px;
  text-align: center;
  outline-color: ${access.color("bottomBar.outline")}
  font-weight: 600;
`;

const useStyles = makeStyles(theme => ({
  play: {
    color: access.color("bottomBar.fg"),
    marginRight: 10,
    marginLeft: 10,
    padding: 6
  },
  button: {
    color: access.color("bottomBar.fg"),
    padding: 10
  },
  copy: {
    fontSize: 18
  }
}));

function BottomBarGen(params) {
  const classes = useStyles();
  const { mockData, dispatch } = useBranch({ mockData: ["mockData"] });
  const { items } = useBranch({ items: ["items"] });
  const { focus } = useBranch({ focus: ["focus"] });
  const [amount, setAmount] = useState(1);

  const copyToClipboard = textToCopy => {
    try {
      textToCopy = JSON.stringify(textToCopy, null, 2);
    } catch (error) {
      textToCopy = "unable to stringify data";
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    } else {
      const el = document.createElement("textarea");
      el.value = textToCopy;
      el.style.display = "none";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  const gen = () => {
    dispatch(generate, { items, amount });
  };

  const PlayButton = () => {
    return (
      <IconButton className={classes.play} size="small" onClick={gen}>
        <Icon>{access.icon("schemePanel.play")}</Icon>
      </IconButton>
    );
  };

  const CopyButton = () => {
    return (
      <IconButton
        size="small"
        className={classes.button}
        onClick={() => {
          copyToClipboard(mockData);
        }}
      >
        <Icon className={classes.copy}>{access.icon("schemePanel.copy")}</Icon>
      </IconButton>
    );
  };

  const RenderAmountInput = () => {

    const handleSetAmount = (e) => {
      let value = e.target.value;
      
      value = value < 1 ? 1 : value; 
      value = value > 10000 ? 10000 : value; 

      setAmount(value);
    }

    return <AmountInput type={"number"} value={amount} onChange={handleSetAmount} autoFocus={true} />;
  };

  const DownloadButton = () => {
    const fileName = `${focus.lib}_${focus.cat}`;

    return (
      <FileDownloader content={mockData} fileName={fileName} fileExtension={'json'}>
        <IconButton size="small" className={classes.button}>
          <Icon className={classes.copy}>
            {access.icon("schemePanel.download")}
          </Icon>
        </IconButton>
      </FileDownloader>
    );
  };

  return (
    <BottomBar background={access.color("bottomBar.bg")}>
      <ButtonsCont>
        <CopyButton />
        <DownloadButton />
      </ButtonsCont>

      <RenderAmountInput />
      <PlayButton />
    </BottomBar>
  );
}

export default BottomBarGen;
