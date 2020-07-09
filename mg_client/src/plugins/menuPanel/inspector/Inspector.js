import React, { useState, useEffect, useCallback, Fragment } from "react";
import { isUndefined } from "lodash";
import PropTypes from "prop-types";
import { useBranch } from "baobab-react/hooks";
import AceEditor from "react-ace";
import { Button, Checkbox } from "@material-ui/core";
import styled from "styled-components";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";

import {
  getGroupFromType,
  getTypesToSelect,
  getTypeByKey
} from "tree/actions/types";
import { onSchemaChange, tempGenerate } from "tree/actions/items";
import { get } from "plugins/requests";

import Column from "plugins/Layouts/Column";
import Row from "plugins/Layouts/Row";
import Select from "plugins/inputs/Select";
import MultiSelect from "plugins/inputs/MultiSelect";
import Input from "plugins/inputs/Input";
import Label from "plugins/tools/Label";

import * as access from "plugins/access";

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
  const [size, setSize] = useState(item.size);
  const [addEmpty, setAddEmpty] = useState(item.addEmpty || false);
  const [randomSize, setRandomSize] = useState(item.randomSize || false);

  const [additionalValues, setAdditionalValues] = useState(item.value);

  const { types } = useBranch({ types: ["types"] });
  const groups = Object.keys(types).map(t => {
    return getOptionFormat(t);
  });

  const typesToSelect = getTypesToSelect(group.value);

  const { focusedItem } = useBranch({ focusedItem: ["focus", "item"] });
  const { focused } = useBranch({ focused: ["focus"] });
  const { items, dispatch } = useBranch({ items: ["items"] });

  const [categoriesPath, setCategoriesPath] = useState([]);
  useEffect(() => {
    get("/getAllCategoriesPath").then(({data}) => {
      setCategoriesPath(data);
    });
  }, []);

  const revertChanges = () => {
    setTempItem(item);
    setSize(item.size);
    setPrefix(item.prefix);
    setSuffix(item.suffix);
    setType(initType);
    setAddEmpty(item.addEmpty);
    setGroup(g);
  };

  const compareItem = () => {
    let theSame = true;

    tempGenerate({ [focusedItem]: tempItem }).then(res => {
      setTempData(res.data[0]);
    });

    if (item.type !== type.type) theSame = false;
    else if (Boolean(item.size || size) && item.size !== size) theSame = false;
    else if (
      (!isUndefined(item.randomSize) || !isUndefined(randomSize)) &&
      size &&
      item.randomSize !== randomSize
    )
      theSame = false;
    else if (Boolean(item.prefix || prefix) && item.prefix !== prefix)
      theSame = false;
    else if (Boolean(item.suffix || suffix) && item.suffix !== suffix)
      theSame = false;
    else if (Boolean(item.addEmpty || addEmpty) && item.addEmpty !== addEmpty )  
      theSame = false;  
    else if (JSON.stringify(item.value) !== JSON.stringify(additionalValues))
      theSame = false;

    if (!theSame) {
      setShowButtons(true);
    } else if (showButtons) {
      setShowButtons(false);
    }
  };

  const stableCompare = useCallback(compareItem, [
    type,
    size,
    prefix,
    suffix,
    additionalValues,
    randomSize,
    addEmpty
  ]);

  useEffect(() => {
    stableCompare();
  }, [type, size, addEmpty, prefix, suffix, additionalValues, randomSize, stableCompare]);

  const changeTypeInSchema = selectedItem => {
    setType(selectedItem);
    changeTempItem("type", selectedItem.type);
  };

  const changeAddEmpty = () => {
    setAddEmpty(!addEmpty);
    changeTempItem("addEmpty", !addEmpty);
  };

  const changeSize = value => {
    setSize(value);
    changeTempItem("size", value);
  };

  const changeRandomSize = () => {
    setRandomSize(!randomSize);
    changeTempItem("randomSize", !randomSize);
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
    changeTempItem("value", value);
  };

  const changeTempItem = (field, value) => {
    let newItem = { ...tempItem };

    if (value === "") {
      delete newItem[field];
    } else {
      newItem[field] = value;
    }

    setTempItem(newItem);
  };

  const changeSchema = () => {
    let newItems = { ...items };

    newItems[focusedItem] = tempItem;
    dispatch(onSchemaChange, newItems);
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
      const value = tempItem.value ? tempItem.value[label] : "";

      const updateOptions = (typeOptions = []) => {
        if(!Array.isArray(typeOptions) && typeOptions === "getAllCategoriesPath"){
          typeOptions = categoriesPath;
        }

        return typeOptions;
      }

      const renderNumber = () => {
        return (
          <Input
            key={i}
            label={access.translate(label)}
            initValue={value}
            type={"number"}
            placeholder={placeholder}
            onChange={v =>
              changeAdditionalValues({ ...additionalValues, [label]: v })
            }
          />
        );
      };

      const renderString = () => {
        return (
          <Input
            key={i}
            label={access.translate(label)}
            initValue={value}
            placeholder={placeholder}
            onChange={v =>
              changeAdditionalValues({ ...additionalValues, [label]: v })
            }
          />
        );
      };

      const renderArray = () => {
        return (
          <Input
            key={i}
            label={access.translate(label)}
            type={'array'}
            initValue={value}
            placeholder={placeholder}
            onChange={v =>
              changeAdditionalValues({ ...additionalValues, [label]: v })
            }
          />
        );
      }

      const renderAutoComplete = () => {
        let options = updateOptions(ren[1].options).map(o => {
          return getOptionFormat(o);
        });

        options = options.filter(o => {
          return o.value !== `${focused.lib}.${focused.cat}`;
        });

        return (
          <Select
            key={i}
            label={access.translate(label)}
            options={options}
            initValue={getOptionFormat(value)}
            onSelect={v =>
              changeAdditionalValues({
                ...additionalValues,
                [label]: v.value
              })
            }
          />
        );
      };

      const renderAutoCompleteArray = () => {

        let options = updateOptions(ren[1].options).map(o => {
          return getOptionFormat(o);
        });

        options = options.filter(o => {
          return o.value !== `${focused.lib}.${focused.cat}`;
        });

        const initValue = Array.isArray(value)
          ? value.map(v => {
              return getOptionFormat(v);
            })
          : [];

        return (
          <MultiSelect
            key={i}
            label={access.translate(label)}
            options={options}
            initValue={initValue}
            onSelect={val =>
              changeAdditionalValues({
                ...additionalValues,
                [label]: val.map(v => {
                  return v.value;
                })
              })
            }
          />
        );
      };

      const renderersDir = {
        string: renderString,
        number: renderNumber,
        autocomplete: renderAutoComplete,
        autocompleteArray: renderAutoCompleteArray,
        array: renderArray
      };

      return renderersDir[rendererType]
        ? renderersDir[rendererType]()
        : renderString();
    };

    if (type.renderer) {
      const renderers = Object.entries(type.renderer);
      return renderers.map(getRightRender);
    }
  };

  const renderEditor = () => {
    const style = {
      height: "100%",
      width: "100%"
    };

    const options = {
      showGutter: false,
      tabSize: 2
    };

    const code = JSON.stringify(tempData, null, 2);

    return (
      <div style={{ height: "400px", overflow: "auto" }}>
        <AceEditor
          style={style}
          mode="json"
          theme="monokai"
          name="example"
          fontSize={14}
          value={code}
          setOptions={options}
        />
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <ButtonsRow show={showButtons}>
        <Button variant="outlined" color="secondary" onClick={revertChanges}>
          {access.translate("Cancel")}
        </Button>
        <Button variant="outlined" color="secondary" onClick={changeSchema}>
          {access.translate("Save")}
        </Button>
      </ButtonsRow>
    );
  };

  const renderPrefixSuffix = () => {
    if (type.pure) return null;

    return (
      <Fragment>
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
      </Fragment>
    );
  };

  const Placeholder = () => {
    return <div style={{ flex: 1 }}></div>;
  };

  const renderSize = () => {
    return (
      <Row
        style={{
          boxShadow: "unset",
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
        }}
      >
        <Input
          label={access.translate("size")}
          initValue={size}
          type={"number"}
          onChange={changeSize}
        />

        <Label width={"140px"} fontSize={"13px"}>
          {access.translate("Random Size:")}
        </Label>

        <Checkbox
          style={{marginRight: 5}}
          checked={randomSize}
          onChange={changeRandomSize}
          size="small"
          value="primary"
          disabled={!size}
        />
      </Row>
    );
  };

  const renderAddEmpty = () => {
    return(
      <Row>
        <Label width={"50%"} fontSize={"13px"}>
          {access.translate("Add possible empty items:")}
        </Label>
        <Checkbox
          style={{ marginRight: 5 }}
          checked={addEmpty}
          onChange={changeAddEmpty}
          size="small"
          value="primary" />
      </Row>
    );
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
        onSelect={changeTypeInSchema}
      />

      {renderSize()}
      {renderFromType()}
      {renderPrefixSuffix()}
      {renderAddEmpty()}
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
