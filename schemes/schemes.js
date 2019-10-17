class Schemes {
    constructor(){
        this.schemes = {};
    }

    getScheme(library,category){
        return this.schemes[library][category];
    }
    
    getAllLibraries(){
        return Object.keys(this.schemes);
    }

    getCategoriesFromLibrary(library){
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