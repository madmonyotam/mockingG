import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { find } from "lodash";
import { ClickAwayListener } from "@material-ui/core";

import * as access from "plugins/access";

import Row from "plugins/Layouts/Row";
import Column from "plugins/Layouts/Column";
import Absolute from "plugins/Layouts/Absolute";
import Label from "plugins/tools/Label";
import Input from "plugins/inputs/Input";

function Select({ options, label, onSelect, initValue }) {
  const [value, setValue] = useState(initValue);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const findInOptions = v => {
    const selection = find(options, o => {
      return o.label.toLowerCase() === v;
    });

    return selection;
  };

  const renderInput = () => {
    const onBlur = () => {
      setTimeout(() => {
        setOnFocus(false);
      }, 200);
    };

    const onChange = v => {
      setValue({ value: v, label: v });

      const selection = findInOptions(v);

      if (selection) {
        onSelect(selection);
      }
    };

    return (
      <Input
        initValue={value.label || ""}
        onFocus={() => {
          setOnFocus(true);
        }}
        onBlur={onBlur}
        label={label}
        onChange={onChange}
      />
    );
  };

  const renderList = () => {
    if (!onFocus) return null;

    const handleSelect = o => {
      setValue(o);
      onSelect(o);
    };

    const list = () => {
      const filtered = options.filter(o => o.label.toLowerCase().indexOf(value.label) !== -1);

      return filtered.map(o => {
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

  const checkSelection = () => {
    const selection = findInOptions(value.label);

    if (!selection) {
      setValue(initValue);
    }
  };

  return (
    <ClickAwayListener onClickAway={checkSelection}>
      <div style={{ position: "relative" }}>
        {renderInput()}
        {renderList()}
      </div>
    </ClickAwayListener>
  );
}

Select.defaultProps = {
  initValue: { value: "", label: "" },
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
