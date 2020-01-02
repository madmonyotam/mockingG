import { find } from "lodash";

let types;

export function setTypes(tree, data) {
  tree.set("types", data);
  types = data;
}

export function getAllTypes(typesByGroup) {
  let allTypes = [];
  for (const g in typesByGroup) {
    const typs = typesByGroup[g];
    allTypes = allTypes.concat(Object.entries(typs));
  }

  allTypes = allTypes.map(el => {
    let t = {...el[1]};
    t.type = el[0];
    return t
  });

  return allTypes;
}

export function getGroupFromType(typ) {

  for (const group in types) {
      const keys = Object.keys(types[group]);
      if(keys.includes(typ)){
        return getOptionFormat(group);
      } 
  }
 
  return getOptionFormat('');
}

export function getTypesToSelect(group){

  const allTypes = getAllTypes(types);

  let typesToSelect = group ? allTypes.filter((t)=>t.group === group) : allTypes;
  typesToSelect = typesToSelect.map((t)=>{ 
    const optionFormatFields = getOptionFormat(t.type,t.name);
    return ({...t, ...optionFormatFields }) 
  });

  return typesToSelect;
}

export function getTypeByKey(k) {
  const allTypes = getAllTypes(types);
  const type = find(allTypes, el => {
    return(el.type === k);
  });
  return type;
}

function getOptionFormat(value,label) {
  if(typeof label ===  'undefined') label = value; 
  return { value, label };
}