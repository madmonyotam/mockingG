import { get } from "../../plugins/requests";

export function setItems(tree, items) {
    tree.set(['items'],items);
}

export function setItemToFocus(tree, item) {
    tree.set(['focus','item'],item);
}

export function setSelected(tree, item) {
    const cat = tree.get(['focus','cat']);
    tree.set(['selected'],`${cat}:${item}`);
}

export function removeItem(tree, field) {
    const focus = tree.get(['focus']);
    const library = focus.lib;
    const category = focus.cat;

    get("/removeFromScheme",{library,category,field}).then(res => {
        console.log(res)
        tree.set('items',res.data);
    });
}

// export function addCategory(tree, category) {
//     const library = tree.get(['focus','lib']);

//     get("/addCategory",{library,category}).then(res => {
//         tree.set('cats',res.data);
//     }).catch((err)=>{
//         console.log(err.response.data.message)
//     });
// }

