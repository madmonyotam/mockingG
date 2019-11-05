import React from "react";
import { get } from "./plugins/requests";
import {useRoot} from 'baobab-react/hooks';

import Main from "./Views/Main";

// get('/getTypes').then((res)=>{
//   console.log(res.data)
// });

// get('/getScheme',{library:'first',category:'test'}).then((res)=>{
//   console.log(res.data)
// });

function App({tree}) {

  const Root = useRoot(tree);

  return (
    <Root>
      <Main/>
    </Root>
  );
}

export default App;
