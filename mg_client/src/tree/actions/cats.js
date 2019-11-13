import { get } from "../../plugins/requests";

export function setCats(tree, cats) {
    tree.set(['cats'],cats);
}

export function setCatToFocus(tree, cat) {
    tree.set(['focus','cat'],cat);
}

export function removeCategory(tree, category) {
    const library = tree.get(['focus','lib']);

    get("/removeCategory",{library,category}).then(res => {
        tree.set('cats',res.data);
    });
}