import React from "react";
import PropTypes from "prop-types";

import * as access from "../access";

import styled from "styled-components";
import Row from "../Layouts/Row";
import FileDownloader from "../tools/FileDownloader";
import CopyToClipBoard from "../tools/CopyToClipBoard";

import { Icon, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ButtonsCont = styled(Row)`
  padding-left: 10px;
`;

const useStyles = makeStyles(theme => ({
  button: {
    color: access.color("bottomBar.fg"),
    padding: 10
  },
  copy: {
    fontSize: 18
  }
}));

function BarButtons({ content, filename }) {
  const classes = useStyles();

  const CopyButton = () => {
    return (
      <CopyToClipBoard content={content}>
        <IconButton size="small" className={classes.button}>
          <Icon className={classes.copy}>
            {access.icon("schemePanel.copy")}
          </Icon>
        </IconButton>
      </CopyToClipBoard>
    );
  };

  const DownloadButton = () => {
    return (
      <FileDownloader
        content={content}
        fileName={filename}
        fileExtension={"json"}
      >
        <IconButton size="small" className={classes.button}>
          <Icon className={classes.copy}>
            {access.icon("schemePanel.download")}
          </Icon>
        </IconButton>
      </FileDownloader>
    );
  };

  return (
    <ButtonsCont>
      <CopyButton />
      <DownloadButton />
    </ButtonsCont>
  );
}

CopyToClipBoard.propsTypes = {
  content: PropTypes.object.isRequired,
  filename: PropTypes.string
};

CopyToClipBoard.defaultProps = {
  filename: "file"
};

export default BarButtons;
