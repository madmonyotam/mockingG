const schemasClass = require('./schemas'); 

describe('types getter tests', () => {
    
    const schemas = new schemasClass();
    
    it('should add schemas', () => { 
        schemas.addSchema('myFirst','test',{name:{type:'firstName'}, gender:{type:'fixedValue',value:'male'}});
        schemas.addSchema('myFirst','test2',{name:{type:'firstName'}});
        schemas.addSchema('second','test',{name:{type:'lastName'}});

        expect(Object.keys(schemas.schemas)).toContain('myFirst'); 
        expect(Object.keys(schemas.schemas)).toContain('second'); 
    });

    it('should get single schema', () => {    
        const secondTest = schemas.getSchema('second','test');
        expect(secondTest).toMatchObject({name:{type:'lastName'}}); 
    });

    it('should get libraries keys', () => {    
        const libKeys = schemas.getAllLibraries();
        expect(libKeys).toContain('myFirst'); 
        expect(libKeys).toContain('second'); 
    });

    it('should get categories keys', () => {    
        const catKeys = schemas.getCategoriesFromLibrary('myFirst');
        expect(catKeys).toContain('test'); 
        expect(catKeys).toContain('test2'); 
    });

    it('should add category', () => {    
        
        const Keys = schemas.getAllCategoriesPath();
        expect(Keys).toContain('myFirst.test'); 
    });

    it('should remove this library', () => {    
        schemas.removeLibrary('second');
        expect(Object.keys(schemas.schemas)).not.toContain('second'); 
    });

    it('should remove this category', () => {    
        schemas.removeschema('myFirst','test2');
        const categories = schemas.getCategoriesFromLibrary('myFirst');
        expect(Object.keys(categories)).not.toContain('test2'); 
    });

    it('should add library', () => {    
        schemas.addLibrary('newLib');
        const libKeys = schemas.getAllLibraries();
        expect(libKeys).toContain('newLib'); 
    });

    it('should add category', () => {    
        schemas.addCategory('newLib','newCat');
        const libKeys = schemas.getCategoriesFromLibrary('newLib');
        expect(libKeys).toContain('newCat'); 
    }); 

});