import React from "react";
import "../video-card.css";
const VideoCard = () => {
  return (
    <div className={"video-card"}>
      <div
        className={"thumbnail"}
        style={{
          backgroundImage:
            "URL(https://i.ytimg.com/vi/Bv_5Zv5c-Ts/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBuEvpvDrCvXDAYFgZ2Ed93KNYbEg)"
        }}
      />
      <div className={"content"}>
        <div className={"title"}>
          JavaScript: Understanding the Weird Parts - The First 3.5 Hours...
        </div>
        <div className={"channel-title"}>Tony Alicea</div>
        <div className={"views"}>1.7M Views</div>
      </div>
    </div>
  );
};

export default VideoCard;
