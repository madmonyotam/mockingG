import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useBranch } from "baobab-react/hooks";
import { debounce } from "lodash";
import AceEditor from "react-ace";
import { Button } from "@material-ui/core";
import styled from "styled-components";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";

import {
  getGroupFromType,
  getTypesToSelect,
  getTypeByKey
} from "../../../tree/actions/types";
import { onSchemeChange, tempGenerate } from "../../../tree/actions/items";

import Column from "../../Layouts/Column";
import Row from "../../Layouts/Row";
import Select from "../../inputs/Select";
import Input from "../../inputs/Input";
import Mask from "../../tools/Mask";

import * as access from "../../access";

const ButtonsRow = styled(Row)`
  display: flex;
  justify-content: space-around;
  height: ${props => (props.show ? "50px" : "0px")};
  min-height: ${props => (props.show ? "50px" : "0px")};
  transition: all 500ms;
`;

function getOptionFormat(value, label) {
  if (typeof label === "undefined") label = value;
  return { value, label };
}

function Inspector({ item }) {
  const g = getGroupFromType(item.type);
  const [group, setGroup] = useState(g);

  let initType = getTypeByKey(item.type) || getOptionFormat("");
  initType.label = initType.name || initType.label;
  const [type, setType] = useState(initType);

  const [tempItem, setTempItem] = useState(item);
  const [tempData, setTempData] = useState({});
  const [showButtons, setShowButtons] = useState(false);

  const [prefix, setPrefix] = useState(item.prefix || "");
  const [suffix, setSuffix] = useState(item.suffix || "");

  const [additionalValues, setAdditionalValues] = useState(item.value);

  const { types } = useBranch({ types: ["types"] });
  const groups = Object.keys(types).map(t => {
    return getOptionFormat(t);
  });
  const typesToSelect = getTypesToSelect(group.value);

  const { focusedItem } = useBranch({ focusedItem: ["focus", "item"] });
  const { items, dispatch } = useBranch({ items: ["items"] });

  const revertChanges = () => {
    setTempItem(item);
    setPrefix(item.prefix);
    setSuffix(item.suffix);
    setType(initType);
    setGroup(g);
  }

  useEffect(() => {
    console.log({prefix})
    compareItem();
  }, [type,prefix,suffix,additionalValues])

  const compareItem = () => {
    let theSame = true;

    tempGenerate({[focusedItem]:tempItem}).then((res)=>{
      setTempData(res.data[0]);
    });

    if (item.type !== type.type) theSame = false;
    else if (Boolean(item.prefix || prefix) && item.prefix !== prefix) theSame = false;
    else if (Boolean(item.suffix || suffix) && item.suffix !== suffix) theSame = false;
    else if (JSON.stringify(item.value) !== JSON.stringify(additionalValues))
      theSame = false;

    if (!theSame) {
      setShowButtons(true);
    } else if (showButtons) {
      setShowButtons(false);
    }
  };

  const changeTypeInScheme = selectedItem => {
    setType(selectedItem)
    changeTempItem("type", selectedItem.type);
  };

  const changePrefix = value => {
    setPrefix(value);
    changeTempItem("prefix", value);
  };

  const changeSuffix = value => {
    setSuffix(value);
    changeTempItem("suffix", value);
  };

  const changeAdditionalValues = value => {
    setAdditionalValues(value);
    changeTempItem("value",value);
  };

  const changeTempItem = (field, value) => {
    let newItem = { ...tempItem };

    if (value === "") {
      delete newItem[field];
    } else {
      newItem[field] = value;
    }

    setTempItem(newItem);
  }

  const changeScheme = () => {
    let newItems = { ...items };

    newItems[focusedItem] = tempItem;
    dispatch(onSchemeChange, newItems);
  };

  const handleOnSelectGroup = groupOption => {
    if (groupOption.value !== group.value) {
      setGroup(groupOption);
      getTypesToSelect(groupOption.value);
      setType(getOptionFormat(""));
    }
  };

  const renderFromType = () => {
    const getRightRender = (ren, i) => {
      const label = ren[0];
      const rendererType = ren[1].type;
      const placeholder = ren[1].placeholder;

      switch (rendererType) {
        case "string":
          return (
            <Input
              key={i}
              label={access.translate(label)}
              initValue={item.value[label]}
              placeholder={placeholder}
              onChange={value =>
                changeAdditionalValues({ ...additionalValues, [label]: value })
              }
            />
          );

        default:
          return null;
      }
    };

    if (type.renderer) {
      const renderers = Object.entries(type.renderer);
      return renderers.map(getRightRender);
    }
  };

  const renderEditor = () => {
    const style = {
      height: "200px",
      width: "100%"
    };

    const code = JSON.stringify(tempData, null, 2);

    return (
      <Row height={"200px"}>
        <Mask opacity={0.9}>
          <AceEditor
            style={style}
            placeholder="Placeholder Text"
            mode="json"
            theme="monokai"
            name="example"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
          />
        </Mask>
      </Row>
    );
  };

  const renderButtons = () => {
    return (
      <ButtonsRow show={showButtons}>
        <Button variant="outlined" color="secondary" onClick={revertChanges}>
          {access.translate("Cancel")}
        </Button>
        <Button variant="outlined" color="secondary" onClick={changeScheme}>
          {access.translate("Save")}
        </Button>
      </ButtonsRow>
    );
  };

  const Placeholder = () => {
    return <div style={{ flex: 1 }}></div>;
  };

  return (
    <Column flex={1}>
      <Select
        label={access.translate("group")}
        options={groups}
        initValue={group}
        onSelect={handleOnSelectGroup}
      />
      <Select
        label={access.translate("type")}
        options={typesToSelect}
        initValue={type}
        onSelect={changeTypeInScheme}
      />
      {renderFromType()}
      <Input
        label={access.translate("prefix")}
        initValue={prefix}
        onChange={changePrefix}
      />
      <Input
        label={access.translate("suffix")}
        initValue={suffix}
        onChange={changeSuffix}
      />
      <Placeholder />
      {renderEditor()}
      {renderButtons()}
    </Column>
  );
}

Inspector.defaultProps = {
  item: ""
};

Inspector.propTypes = {
  item: PropTypes.object
};

export default Inspector;
