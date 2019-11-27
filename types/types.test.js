const typesClass = require('./types'); 
const nameTypes = require('./collection/nameTypes'); 


describe('types getter tests', () => {

    const types = new typesClass();
    types.addTypes(nameTypes);

    it('should get and add types', () => { 
        const allTypes = types.getTypes();

        expect(allTypes).toMatchObject(nameTypes); 
    });

    it('should get single type', () => { 
        
        const firstNameType = types.getTypeByKey('firstName');

        expect(firstNameType).toMatchObject(nameTypes.firstName); 
    });

    it('should get single type', () => { 
        
        const firstNameType = types.getTypesByGroup('names');
        expect(firstNameType.length).toBe(Object.keys(types.getTypes()).length); 
    });

    it('should get types by group', () => { 
        
        const alltypes = types.getTypesArrangeByGroups();
        expect(alltypes.names.firstName.group ).toBe('names'); 
    });

});