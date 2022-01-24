import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
// styled-components : UI 라이브러리
import styled from "styled-components";
import Home from "../features/home/Home";

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
  height: 100vh;
`;
function App() {
  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          {/* <Route path="/signup" component={SignUp} /> */}
          {/* <Route path="/tutorial" />
          <Route path="/rank" /> */}
        </BrowserRouter>
      </Wrapper>
    </StylesProvider>
  );
}

export default App;
