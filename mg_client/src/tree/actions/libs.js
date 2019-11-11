export function setLibs(tree, libs) {
    tree.set(['libs'],libs);
}

export function setLibToFocus(tree, lib) {
    tree.set(['focus','lib'],lib);
}