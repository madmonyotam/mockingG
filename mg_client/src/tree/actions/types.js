let types;

export function setTypes(tree, data) {
  tree.set("types", data);
  types = data;
}

export function getAllTypes(typesByGroup) {
  let allTypes = [];
  for (const g in typesByGroup) {
    const typs = typesByGroup[g];
    allTypes = allTypes.concat(Object.values(typs));
  }

  return allTypes;
}

export function getGroupFromType(typ) {

  for (const group in types) {
      const keys = Object.keys(types[group]);
      if(keys.includes(typ)){
        return group;
      } 
  }
 
  return '';
}

export function getTypesToSelect(group){

  const allTypes = getAllTypes(types);

  let typesToSelect = group ? allTypes.filter((t)=>t.group === group) : allTypes;
  typesToSelect = typesToSelect.map(t => t.name);

  return typesToSelect;
}
