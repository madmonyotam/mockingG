import { get } from "plugins/requests";

function setLibToSelected(tree,lib) {
  tree.set(["selectedLibrary"], lib);
}

export function setLibs(tree, data) {
  tree.set(["libs"], data.libraries);
  setTimeout(() => { 
    tree.set(["projectName"], data.projectName);
  })
  
}

export function setLibToFocus(tree, lib) {
  tree.set(["focus", "lib"], lib);

  if(lib){
    setLibToSelected(tree, lib);
  }
}

export function addLib(tree, lib) {
  get("/addLibrary", { library: lib })
    .then(res => {
      tree.set("libs", res.data);
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
}

export function removeLib(tree, lib) {
  get("/removeLibrary", { library: lib }).then(res => {
    tree.set("libs", res.data);
  });
}

export function editLib(tree, data) {
  const {oldName, newName} = data;

  get("/editLibrary", { oldName, newName }).then(res => {
    tree.set("libs", res.data);
  });
}

export function getCategoriesFromLibrary(tree, library) {
  get("/getCategoriesFromLibrary", { library }).then(res => {
    tree.set("cats", res.data);
    setTimeout(() => {
      tree.set(["focus", "lib"], library);
      setLibToSelected(tree, library);
    });
  });
}
