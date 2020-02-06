import React from "react";
import PropTypes from "prop-types";

import * as access from "plugins/access";

import styled from "styled-components";
import Row from "plugins/Layouts/Row";
import FileDownloader from "plugins/tools/FileDownloader";
import CopyToClipBoard from "plugins/tools/CopyToClipBoard";

import IconButton from "plugins/icons/IconButton";

const ButtonsCont = styled(Row)`
  padding-left: 10px;
`;

function BarButtons({ content, filename }) {

  const CopyButton = () => {
    return (
      <CopyToClipBoard content={content}>
        <IconButton
          icon={access.icon("schemaPanel.copy")}
          color={access.color("bottomBar.fg")}
          iconPadding={8}
          iconSize={18}
        />
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
        <IconButton
          icon={access.icon("schemaPanel.download")}
          color={access.color("bottomBar.fg")}
          iconPadding={8}
          iconSize={18}
        />
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
