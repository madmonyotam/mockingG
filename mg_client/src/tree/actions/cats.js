export function setCats(tree, cats) {
    tree.set(['cats'],cats);
}

export function setCatToFocus(tree, cat) {
    tree.set(['focus','cat'],cat);
}