const schemesClass = require('./schemes'); 

describe('types getter tests', () => {
    
    const schemes = new schemesClass();
    
    it('should add schemes', () => { 
        schemes.addScheme('first','test',{name:{type:'firstName'}, gender:{type:'fixedValue',value:'male'}});
        schemes.addScheme('first','test2',{name:{type:'firstName'}});
        schemes.addScheme('second','test',{name:{type:'lastName'}});

        expect(Object.keys(schemes.schemes)).toEqual(['first','second']); 
    });

    it('should get single scheme', () => {    
        const secondTest = schemes.getScheme('second','test');
        expect(secondTest).toMatchObject({name:{type:'lastName'}}); 
    });

    it('should get libraries keys', () => {    
        const libKeys = schemes.getAllLibraries();
        expect(libKeys).toEqual(['first','second']); 
    });

});