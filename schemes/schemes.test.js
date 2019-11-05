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

});