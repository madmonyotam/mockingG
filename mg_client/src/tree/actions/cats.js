import { get } from "../../plugins/requests";

export function setCats(tree, cats) {
    tree.set(['cats'],cats);
}

export function setCatToFocus(tree, cat) {
    tree.set(['focus','cat'],cat);
}

export function setSelected(tree, cat) {
    const library = tree.get(['focus','lib']);
    tree.set(['selected'],`${library}:${cat}`);
}

export function addCategory(tree, category) {
    const library = tree.get(['focus','lib']);

    get("/addCategory",{library,category}).then(res => {
        tree.set('cats',res.data);
    }).catch((err)=>{
        console.log(err.response.data.message)
    });
}

export function removeCategory(tree, category) {
    const library = tree.get(['focus','lib']);

    get("/removeCategory",{library,category}).then(res => {
        tree.set('cats',res.data);
    });
}