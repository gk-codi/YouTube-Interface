import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header";
import MainVideo from "./Components/MainVideo";
import VideoCard from "./Components/VideoCard";
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
        <div className={"header"}>
          <Header />
        </div>
        <div class={"content-wrapper"}>
          <div className={"main-video"}>
            <MainVideo />
          </div>
          <div className={"sidebar"}>
            <h3>Up next</h3>
            <div className={"videos-list"}>
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
              <VideoCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
