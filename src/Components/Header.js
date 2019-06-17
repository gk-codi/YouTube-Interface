import React from "react";
import { VideoCall, Apps } from "@material-ui/icons";
import youtubeImage from "../assets/yt_logo_rgb_light.png";

const Header = () => {
  return (
    <div className={"navigation-bar"}>
      <div className={"left-wrapper"}>
        <div className={"logo"}>
          <img src={youtubeImage} alt={"Youtube"} />
        </div>
      </div>
      <div className={"center-wrapper"}>
        <div className={"search-wrapper"}>
          <input type="text" />
          <button>S</button>
        </div>
      </div>
      <div className={"right-wrapper"}>
        <div className={"icons"}>
          <VideoCall />
          <Apps />
          <VideoCall />
          <Apps />
        </div>
      </div>
    </div>
  );
};

export default Header;
