import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { find } from "lodash";

import * as access from "../access";

import Row from "../../plugins/Layouts/Row";
import Column from "../../plugins/Layouts/Column";
import Absolute from "../../plugins/Layouts/Absolute";
import Label from "../../plugins/tools/Label";
import Input from "./Input";

function Select({ options, label, onSelect, initValue }) {
  const [value, setValue] = useState(initValue);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const findInOptions = (v) => {
    const selection = find(options, o => {
      return o.label === v;
    });

    return selection;
  }

  const renderInput = () => {
    const onBlur = () => {
      const selection = findInOptions(value);

      if (!selection) {
        setValue(initValue);
      }

      setTimeout(() => {
        setOnFocus(false);
      }, 200);
    };

    const onChange = v => {
      setValue(v);

      const selection = findInOptions(v);

      if (selection) {
        onSelect(selection);
      }
    };

    return (
      <Input
        initValue={value.label || ''}
        onFocus={() => { setOnFocus(true) }}
        onBlur={onBlur}
        label={label}
        onChange={onChange}
      />
    );
  };

  const renderList = () => {
    if (!onFocus) return null;

    const handleSelect = o => {
      onSelect(o);
      setValue(o);
    };

    const list = () => {
      return options.map(o => {
        return (
          <Row
            key={o.value}
            style={{
              boxShadow: "unset",
              borderBottom: `1px solid ${access.color("backgrounds.secondary")}`
            }}
            background={access.color("colors.white")}
            menuItem={true}
            onClick={() => {
              handleSelect(o);
            }}
          >
            <Label>{o.label}</Label>
          </Row>
        );
      });
    };

    return (
      <Absolute top={"55px"} style={{ zIndex: 10 }}>
        <Column height={"fit-content"} style={{ maxHeight: 500 }}>
          {list()}
        </Column>
      </Absolute>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      {renderInput()}
      {renderList()}
    </div>
  );
}

Select.defaultProps = {
  initValue: {value:"",label:""},
  options: [],
  label: "lebel",
  onSelect: () => {}
};

Select.propTypes = {
  initValue: PropTypes.object,
  options: PropTypes.array,
  label: PropTypes.string,
  onSelect: PropTypes.func
};

export default Select;
