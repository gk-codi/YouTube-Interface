import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageClass: "main-page"
    };
  }

  render() {
    const { currentPageClass } = this.state;
    return (
      <div className={`app ${currentPageClass}`}>
        <div className={"header"} />
        <div class={"content-wrapper"}>
          <div className={"main-video"} />
          <div className={"sidebar"} />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
