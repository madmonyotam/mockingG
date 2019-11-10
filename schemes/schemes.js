const fs = require('fs');
const mySchemes = require('./mySchemes.json');

class Schemes {
    constructor(){
        this.schemes = mySchemes;
    }

    setApp(app){
        this.app = app;
        app.use('/mocking_G/write',(req, res)=>{

            fs.writeFile("./schemes/mySchemes.json", JSON.stringify({name:'222'}), function(err) {

            if(err) { return console.log(err); }
        
            res.send('The file was saved!');
        }); 

        })

        app.get('/mocking_G/getAllLibraries',(req, res)=>{
            res.send(this.getAllLibraries());
        })

        app.get('/mocking_G/getCategoriesFromLibrary',(req, res)=>{
            const { query } = req;
            const { library } = query;
            if(!library){
                res.status(400).send('missing library in query');
            }

            res.send(this.getCategoriesFromLibrary(library));
        })

        app.get('/mocking_G/getScheme',(req, res)=>{
            const { query } = req;
            const { library, category } = query;
            if(!library || !category){
                res.status(400).send('missing library or category in query');
            }

            res.send(this.getScheme(library,category));
        })

        // app.get('/mocking_G/getCategoriesFromLibrary',(req, res)=>{
        //     res.send(this.getCategoriesFromLibrary(req.library));
        // })

        // app.get('/mocking_G/getAllLibraries',(req, res)=>{
        //     res.send(this.getAllLibraries());
        // })

        // app.get('/mocking_G/getAllLibraries',(req, res)=>{
        //     res.send(this.getAllLibraries());
        // })
    }

    getScheme(library,category){
        if(!this.schemes[library]) return undefined;
        return this.schemes[library][category];
    }
    
    getAllLibraries(){
        return Object.keys(this.schemes);
    }

    getCategoriesFromLibrary(library){
        if(!this.schemes[library]) return undefined;
        return Object.keys(this.schemes[library]);
    }

    addScheme(library,category,scheme){
        if(!this.schemes[library]) this.schemes[library] = {};

        if(this.schemes[library][category]) throw Error('scheme all ready exist');
        this.schemes[library][category] = scheme;
    }

    addToScheme(library,category,field){
        if(!this.schemes[library]) throw Error('library does not exist');
        if(!this.schemes[library][category]) throw Error(`category does not exist on library ${library}`);

        this.schemes[library][category] = {...this.schemes[library][category], field} 
    }

    removeFromScheme(library,category,field){
        if(!this.schemes[library]) throw Error('library does not exist');
        if(!this.schemes[library][category]) throw Error(`category does not exist on library ${library}`);

        delete this.schemes[library][category][field];
    }

    replaceScheme(){
        this.schemes[library][category] = scheme;
    }


    removeScheme(library,category){
        delete this.schemes[library][category];
    }


    removeLibrary(library){
        delete this.schemes[library];
    }

}

module.exports = Schemes;