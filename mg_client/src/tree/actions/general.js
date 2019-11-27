import { getLibraryPack } from "../../plugins/canvases/utils/packUtils";

export function setKey(tree, { newKey, itemName}) {
    tree.set('viewKey',newKey);
}