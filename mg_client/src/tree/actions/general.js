import { onItemSelected } from "../../plugins/canvases/utils/packUtils";

export function setKey(tree, { newKey, schemeName}) {
    const viewKey = tree.get('viewKey');
    const focus = tree.get(['focus']);

    if(viewKey !== newKey){
        tree.set('viewKey',newKey);

        setTimeout(() => {
            onItemSelected(focus.lib,focus.cat,schemeName);
        }, 200) 
    } else {
        onItemSelected(focus.lib,focus.cat,schemeName);
    }
}