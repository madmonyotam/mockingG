import React from "react";
import {useRoot} from 'baobab-react/hooks';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { color } from "plugins/access";
import Main from "Views/Main";

const primary = color('materialUI.primary');
const secondary = color('materialUI.secondary');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    }
  }
});


function App({tree}) {

  const Root = useRoot(tree);

  return (
    <Root>
      <ThemeProvider theme={theme}>
        <Main/>
      </ThemeProvider>
    </Root>
  );
}

export default App;
