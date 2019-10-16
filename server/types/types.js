class Types {
    constractor(){
        this.types = {};
    }

    addTypes(types){
        //TODO: check for same type name;
        this.types = { ...this.types, ...types }
    }

    getTypes(){
       return this.types; 
    }

    getTypesByGroup(groupName){
      let group = [];
      for (const key in this.types) { 
          const type = this.types[key];        
          if(type.group === groupName) group.push(type);
      }

      return group;
    }

    getTypeByKey(key){
        return this.types[key];
    }
}



module.exports = Types;
