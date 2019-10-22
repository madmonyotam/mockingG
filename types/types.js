class Types {
    constructor(){
        this.types = {};
    }

    setApp(app){
        this.app = app;
        app.use('/mocking_G/getTypes',(req, res)=>{
            res.send(this.getTypes());
        })

        app.use('/mocking_G/getTypesByGroup',(req, res)=>{
            res.send(this.getTypesByGroup(req.query.groupName));
        })
    }

    getTypes(){
       return this.types; 
    }

    addTypes(types){
        //TODO: check for same type name;
        this.types = { ...this.types, ...types }
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
