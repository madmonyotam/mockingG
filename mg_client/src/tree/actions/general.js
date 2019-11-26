import { getLibraryPack } from "../../plugins/canvases/utils/packUtils";

export function setKey(tree, { newKey, schemeName}) {
    const viewKey = tree.get('viewKey');
    const focus = tree.get('focus');
    const libraryPack = getLibraryPack();

    if(viewKey !== newKey){
        tree.set('viewKey',newKey);

        setTimeout(() => {
            libraryPack.onItemSelected(focus.lib,focus.cat,schemeName);
        }, 200) 
    } else {
        libraryPack.onItemSelected(focus.lib,focus.cat,schemeName);
    }
}