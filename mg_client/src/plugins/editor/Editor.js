import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import { useBranch } from "baobab-react/hooks";
import { isEqual } from "lodash";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";

import { onSchemaChange } from "tree/actions/items";

function Editor({ width, isData }) {
  const editorRef = useRef();

  const { items, dispatch } = useBranch({ items: ["items"] });
  const { mockData } = useBranch({ mockData: ["mockData"] });
  const [initCode, setInitCode] = useState("");
  const [code, setCode] = useState("");

  const data = isData ? mockData : items;
  const codeFromProps = JSON.stringify(data, null, 2);

  useEffect(() => {
    // reset undo maneger
    if(editorRef.current){
      const { editor } = editorRef.current;
      const session = editor.getSession();
      const undoManager = session.getUndoManager();
      undoManager.reset();
      session.setUndoManager(undoManager);
    }
  }, [isData])

  if (data !== null && codeFromProps !== initCode) {
    setInitCode(codeFromProps);
    setCode(codeFromProps);
  }

  const updateSchema = newCode => {
    try {
      newCode = JSON.parse(newCode);
      dispatch(onSchemaChange, newCode);
    } catch (error) {
      dispatch((tree) => {
        tree.set("mockData", null);
      })
    }
  };

  const onLoad = () => {};

  const onChange = c => {
    if(isEqual(c,codeFromProps)) return null;

    setCode(c);
    if (!isData) {
      updateSchema(c);
    }
  };

  const options = {
    showLineNumbers: true,
    tabSize: 2
  };

  const style = {
    height: "100%",
    width: width
  };

  return (
    <AceEditor
      ref={editorRef}
      style={style}
      debounceChangePeriod={1000}
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
