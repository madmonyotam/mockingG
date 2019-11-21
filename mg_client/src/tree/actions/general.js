import { onCategorySelected } from "../../plugins/canvases/utils/packUtils";

export function setKey(tree, { newKey, schemeName}) {
    const viewKey = tree.get('viewKey');
    const lib = tree.get(['focus','lib']);

    if(viewKey !== newKey){
        tree.set('viewKey',newKey);

        setTimeout(() => {
            onCategorySelected(lib,schemeName);
        }, 200) 
    } else {
        onCategorySelected(lib,schemeName);
    }
}