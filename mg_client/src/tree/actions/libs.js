import { get } from "../../plugins/requests";

export function setLibs(tree, libs) {
    tree.set(['libs'],libs);
}

export function setLibToFocus(tree, lib) {
    tree.set(['focus','lib'],lib);
}

export function addLib(tree, lib) {
    get("/addLibrary",{library:lib}).then(res => {
        tree.set('libs',res.data);
    }).catch((err)=>{
        console.log(err.response.data.message)
    });
}

export function removeLib(tree, lib) {
    get("/removeLibrary",{library:lib}).then(res => {
        tree.set('libs',res.data);
    });
}