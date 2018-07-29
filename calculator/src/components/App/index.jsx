import React, { Component } from 'react';
import './style.css';
import { Provider } from "react-redux";

import Calculator from "../Calculator";
import store from "../../store";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <h1 id="app-title">
            My Calculator
        </h1>
          <Calculator />
        </div>
      </Provider>
    );
  }
}

export default App;