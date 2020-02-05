import { getLibraryPack } from "plugins/canvases/utils/packUtils";
import { get } from "plugins/requests";

function setCatToSelected(tree,cat) {
  tree.set(["selectedCategory"], cat);
}

export function generateFromCat(tree,category, amount = 1) {
  const library = tree.get(["focus", "lib"]);

  get("/generate", { library, category, amount }).then((res)=>{
    tree.set('mockData',res.data);
  }).catch((err)=>{
    //TODO: notify type does not exist
    tree.set('mockData',null);
    console.log(err.response.data.message)
  })
}

export function setCats(tree, cats) {
  tree.set(["cats"], cats);
}

export function setCatToFocus(tree, cat) {
  tree.set(["focus", "cat"], cat);

  if(cat){
    setCatToSelected(tree,cat);
  }
}

export function addCategory(tree, category) {
  const library = tree.get(["focus", "lib"]);

  get("/addCategory", { library, category })
    .then(res => {
      tree.set("cats", res.data);
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
}

export function editCategory(tree, data) {
  const library = tree.get(["focus", "lib"]);
  const selectedCategory = tree.get("selectedCategory");
  const {oldName, newName} = data;

  get("/editCategory", {library, oldName, newName }).then(res => {
    tree.set("cats", res.data);

    if(selectedCategory === oldName){
      tree.set("selectedCategory", newName);
    }

  });
}

export function removeCategory(tree, category) {
  const library = tree.get(["focus", "lib"]);

  get("/removeCategory", { library, category }).then(res => {
    tree.set("cats", res.data);
  });
}

export function getItemsFromCategory(tree, category) {
  const library = tree.get(["focus", "lib"]);

  get("/getSchema", { library, category }).then(res => {
    tree.set("items", res.data);
    setTimeout(() => {
      tree.set(["focus", "cat"], category);
      setCatToSelected(tree,category);
      generateFromCat(tree,category)
    });
  });
}

export function setKey(tree, { newKey, schemaName }) {
  const viewKey = tree.get('viewKey');
  const lib = tree.get(['focus','lib']);
  
  if(viewKey !== newKey){
    tree.set('viewKey',newKey);
    
    setTimeout(() => {
        getLibraryPack().onCategorySelected(lib,schemaName);
      }, 200) 
  } else {
    getLibraryPack().onCategorySelected(lib,schemaName);
  }
}
