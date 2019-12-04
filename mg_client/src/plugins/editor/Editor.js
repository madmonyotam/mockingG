import React, { useState } from "react";
import AceEditor from "react-ace";
import { useBranch } from "baobab-react/hooks";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";

import { onEditorChange } from "../../tree/actions/items";

function Editor({ width, isData }) {
  const { items, dispatch } = useBranch({ items: ["items"] });
  const { mockData } = useBranch({ mockData: ["mockData"] });
  const [initCode, setInitCode] = useState("");
  const [code, setCode] = useState("");

  const data = isData ? mockData : items;
  const codeFromProps = JSON.stringify(data, null, 2);

  if (data !== null && codeFromProps !== initCode) {
    setInitCode(codeFromProps);
    setCode(codeFromProps);
  }

  const updateScheme = newCode => {
    try {
      newCode = JSON.parse(newCode);
      dispatch(onEditorChange, newCode);
    } catch (error) {
      dispatch((tree) => {
        tree.set("mockData", null);
      })
    }
  };

  const onLoad = () => {};

  const onChange = c => {
    setCode(c);
    if (!isData) {
      updateScheme(c);
    }
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
      name="editor"
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
