import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useBranch } from "baobab-react/hooks";
import { debounce } from "lodash";

import {
  getGroupFromType,
  getTypesToSelect,
  getTypeByKey
} from "../../../tree/actions/types";
import { onSchemeChange } from "../../../tree/actions/items";

import Column from "../../Layouts/Column";
import Select from "../../inputs/Select";
import Input from "../../inputs/Input";

import * as access from "../../access";

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

  const changeTypeInScheme = selectedItem => {
    setType(selectedItem);
    changeSchemeByField("type", selectedItem.type);
  };

  const changePrefix = value => {
    setPrefix(value);
    changeSchemeByField("prefix", value);
  };

  const changeSuffix = value => {
    setSuffix(value);
    changeSchemeByField("suffix", value);
  };

  const changeAdditionalValues = value => {
    setAdditionalValues(value);
    changeSchemeByField("value",value);
  }

  const debouncePrefix = debounce(changePrefix, 1500);
  const debounceSuffix = debounce(changeSuffix, 1500);
  const debounceAdditionalValue = debounce(changeAdditionalValues, 1500);

  const changeSchemeByField = (field, value) => {
    let newItems = { ...items };
    let newItem = { ...item };

    if (value === "") {
      delete newItem[field];
    } else {
      newItem[field] = value;
    }

    newItems[focusedItem] = newItem;
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
                debounceAdditionalValue({ ...additionalValues, [label]: value })
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
        onChange={debouncePrefix}
      />
      <Input
        label={access.translate("suffix")}
        initValue={suffix}
        onChange={debounceSuffix}
      />
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
