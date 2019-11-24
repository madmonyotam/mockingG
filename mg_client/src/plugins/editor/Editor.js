import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";

function Editor({ width, data }) {
  const [initCode, setInitCode] = useState("");
  const [code, setCode] = useState("");

  const codeFromProps = JSON.stringify(data, null, 2);

  if (data!==null && codeFromProps !== initCode) {
    setInitCode(codeFromProps);
    setCode(codeFromProps);
  }

  const onLoad = () => {};

  const onChange = c => {
    setCode(c);
  };

  const options = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: false,
    enableSnippets: false,
    showLineNumbers: true,
    tabSize: 2
  };

  const style = {
    height: "100%",
    width: width
  };

  return (
    <AceEditor
      style={style}
      placeholder="Placeholder Text"
      mode="json"
      theme="xcode"
      name="blah2"
      onLoad={onLoad}
      onChange={onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={code}
      setOptions={options}
    />
  );
}

export default Editor;
