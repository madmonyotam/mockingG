import React, { useState } from "react";
import PropTypes from "prop-types";
import { useBranch } from "baobab-react/hooks";

import { getGroupFromType, getTypesToSelect, getTypeByKey } from "../../../tree/actions/types";

import Column from "../../Layouts/Column";
import Select from "../../inputs/Select";
import Input from "../../inputs/Input";

import * as access from "../../access";

function getOptionFormat(value,label) {
  if(typeof label ===  'undefined') label = value; 
  return { value, label };
}

function Inspector({item}) {

  const g = getGroupFromType(item.type);
  const [group, setGroup] = useState(g);

  let initType = getTypeByKey(item.type) || getOptionFormat('');
  initType.label = initType.name || initType.label;
  const [type, setType] = useState(initType);

  const [prefix, setPrefix] = useState(item.prefix || '');
  const [suffix, setSuffix] = useState(item.suffix || '');

  const { types } = useBranch({ types: ["types"] });
  const groups = Object.keys(types).map((t)=>{return getOptionFormat(t)});
  const typesToSelect = getTypesToSelect(group.value);

  const handleOnSelectGroup = (groupOption)=>{
  
    if(groupOption.value !== group.value){
      setGroup(groupOption);
      getTypesToSelect(groupOption.value);
      setType(getOptionFormat(''));
    }
  }

  const renderFromType = ()=>{
    if(type.renderer){
      console.log(type.renderer)
    }
  }

  return (
    <Column flex={1}>
      <Select label={access.translate('group')} options={groups} initValue={group} onSelect={handleOnSelectGroup} />
      <Select label={access.translate('type')} options={typesToSelect} initValue={type} onSelect={setType} />
      { renderFromType() }
      <Input  label={access.translate('prefix')} initValue={prefix} onChange={setPrefix}/>
      <Input  label={access.translate('suffix')} initValue={suffix} onChange={setSuffix}/>
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
