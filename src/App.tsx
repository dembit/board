import React from 'react';
import styled from "styled-components"
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Cards from './components/Cards/Cards';


const AppDivStyle = styled.div`
    width: 100%;
    height: 100%;

`


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <AppDivStyle >
            <Route path='/' component={Cards} />
        </AppDivStyle>
      </Switch>
    </BrowserRouter>
  );
}




export default App;
