
import colors from "../config/colors";
import icons from "../config/icons";

function get(collection, path) {
    if(!path) return collection;
    
    let value = collection;
    
    if (typeof path ===  'string') {
        path = path.split(/[\.,\/]/);
    }
    
    for (let i = 0; i < path.length; i++) {
        
        if(typeof value === 'undefined'){
            return undefined;
        }
        value = value[path[i]];  
    }
    
    return value; 
};

export const color = (path) => {
    let code = get(colors,path);
    
    if ( !(typeof code === 'string') ) {     
        return code;
    } 

    if ( code.startsWith('#') ) {
      return code;
    } 

    if ( code.indexOf('.') > -1 || code.indexOf(',') > -1 ){
        return color(code);
    }

    return undefined;
};

export const icon = (path, getType = false) => {
    const typeOrName = getType ? 'type' : 'name';

    let code = get(icons,path);
    
    if ( typeof code === 'string' && (code.indexOf('.') > -1 || code.indexOf(',') > -1) ){
        return icon(code,getType);
    }

    if(!code) return undefined;

    if ( !code[typeOrName] ) {     
        return code;
    }

    return code[typeOrName];
};

export const translate = (value) => {
    return value;
}

