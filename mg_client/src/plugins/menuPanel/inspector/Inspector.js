import React, { useState } from "react";
import PropTypes from "prop-types";
import { useBranch } from "baobab-react/hooks";

import { getGroupFromType, getTypesToSelect } from "../../../tree/actions/types";

import Column from "../../Layouts/Column";
import Select from "../../inputs/Select";

import * as access from "../../access";

function Inspector({item}) {
  console.log({item})
  const g = getGroupFromType(item.type);
  const [group, setGroup] = useState(g);
  const [type, setType] = useState(item.type);

  const { types } = useBranch({ types: ["types"] });
  const groups = Object.keys(types);
  const typesToSelect = getTypesToSelect(group);

  const handleOnSelectGroup = (v)=>{
    if(v !== group){
      setGroup(v);
      getTypesToSelect(v);
      setType('');
    }
  }

  return (
    <Column flex={1}>
      <Select label={access.translate('group')} options={groups} initValue={group} onSelect={handleOnSelectGroup} />
      <Select label={access.translate('type')} options={typesToSelect} initValue={type} onSelect={setType} />
    </Column>
  );
}

Inspector.defaultProps = {
  item: ""
};

Inspector.propTypes = {
  item: PropTypes.object,
};

export default Inspector;
