const gen = require('./generator');

describe('generate function', () => {

    it('should generate 10 items', () => { 

        const scheme = { 
            name: { type:'firstName' }
        }
        
        const data = gen.generate(scheme);

        expect(data.length).toEqual(10); 
    });

    it('should generate 100 items', () => { 

        const scheme = { 
            name: { type:'firstName'}
        }
        
        const data = gen.generate(scheme,100);

        expect(data.length).toEqual(100); 
    });

    it('should generate 10000 items as max', () => { 

        const scheme = { 
            name: { type:'firstName'}
        }
        
        const data = gen.generate(scheme,10005);

        expect(data.length).toEqual(10000); 
    });

    it('should generate by scheme', () => { 

        gen.schemes.addScheme('first','test',{name:{type:'firstName'}, gender:{type:'fixedValue',value:'male'}});

        const schemes = gen.schemes.getScheme('first','test');
        const data = gen.generate(schemes,30);

        expect(data.length).toEqual(30); 
        expect(Object.keys(data[0])).toEqual(['name','gender']); 
        expect(data[10].gender).toEqual('male'); 
    });


});