import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { find, isEmpty } from "lodash";
import { ClickAwayListener } from "@material-ui/core";

import * as access from "plugins/access";

import Row from "plugins/Layouts/Row";
import Column from "plugins/Layouts/Column";
import Absolute from "plugins/Layouts/Absolute";
import Label from "plugins/tools/Label";
import Chip from "plugins/tools/Chip";
import Input from "plugins/inputs/Input";

function MultiSelect({ options, label, onSelect, initValue }) {
  const [multiValue, setMultiValue] = useState(initValue);
  const [value, setValue] = useState("");
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const findInOptions = v => {
    const selection = find(options, o => {
      return o.label === v;
    });

    return selection;
  };

  const checkSelection = () => {
    const selection = findInOptions(value.label);

    if (!selection) {
      setValue(initValue);
    }
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
      setMultiValue([o, ...multiValue]);
      onSelect([o, ...multiValue]);
    };

    const list = () => {
      const filtered = options.filter(o => {
        let toReturn = true;

        multiValue.forEach(v => {
          if (v.value === o.value) {
            toReturn = false;
          }
        });

        return toReturn;
      });

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

  const renderMultiValue = () => {
    
    const handleDelete = value => {
      const values = multiValue.filter(v => {
        return v.value !== value.value;
      });
      setMultiValue(values);
      onSelect(values);
    };

    return multiValue.map(v => {
      return <Chip key={v.label} value={v} onDelete={handleDelete} />;
    });
  };

  const renderChips = () => {
    if(isEmpty(multiValue)) return null;
    return <Row style={{ overflowX: "auto" }}> {renderMultiValue()} </Row>
  }

  return (
    <ClickAwayListener onClickAway={checkSelection}>
      <div style={{ position: "relative" }}>
        {renderInput()}
        {renderList()}
        {renderChips()}
        
      </div>
    </ClickAwayListener>
  );
}

MultiSelect.defaultProps = {
  initValue: [],
  options: [],
  label: "lebel",
  onSelect: () => {}
};

MultiSelect.propTypes = {
  initValue: PropTypes.array,
  options: PropTypes.array,
  label: PropTypes.string,
  onSelect: PropTypes.func
};

export default MultiSelect;
