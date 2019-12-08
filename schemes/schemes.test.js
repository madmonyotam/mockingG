const schemesClass = require('./schemes'); 

describe('types getter tests', () => {
    
    const schemes = new schemesClass();
    
    it('should add schemes', () => { 
        schemes.addScheme('myFirst','test',{name:{type:'firstName'}, gender:{type:'fixedValue',value:'male'}});
        schemes.addScheme('myFirst','test2',{name:{type:'firstName'}});
        schemes.addScheme('second','test',{name:{type:'lastName'}});

        expect(Object.keys(schemes.schemes)).toContain('myFirst'); 
        expect(Object.keys(schemes.schemes)).toContain('second'); 
    });

    it('should get single scheme', () => {    
        const secondTest = schemes.getScheme('second','test');
        expect(secondTest).toMatchObject({name:{type:'lastName'}}); 
    });

    it('should get libraries keys', () => {    
        const libKeys = schemes.getAllLibraries();
        expect(libKeys).toContain('myFirst'); 
        expect(libKeys).toContain('second'); 
    });

    it('should get categories keys', () => {    
        const catKeys = schemes.getCategoriesFromLibrary('myFirst');
        expect(catKeys).toContain('test'); 
        expect(catKeys).toContain('test2'); 
    });

    it('should add category', () => {    
        
        const Keys = schemes.getAllCategoriesPath();
        expect(Keys).toContain('myFirst.test'); 
    });

    it('should remove this library', () => {    
        schemes.removeLibrary('second');
        expect(Object.keys(schemes.schemes)).not.toContain('second'); 
    });

    it('should remove this category', () => {    
        schemes.removeScheme('myFirst','test2');
        const categories = schemes.getCategoriesFromLibrary('myFirst');
        expect(Object.keys(categories)).not.toContain('test2'); 
    });

    it('should add library', () => {    
        schemes.addLibrary('newLib');
        const libKeys = schemes.getAllLibraries();
        expect(libKeys).toContain('newLib'); 
    });

    it('should add category', () => {    
        schemes.addCategory('newLib','newCat');
        const libKeys = schemes.getCategoriesFromLibrary('newLib');
        expect(libKeys).toContain('newCat'); 
    }); 

});