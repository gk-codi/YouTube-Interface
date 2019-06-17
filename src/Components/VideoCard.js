import React from "react";
import { nFormatter } from "../helper";
import "../video-card.css";

const VideoCard = video => {
  const { id, snippet, statistics, contentDetails } = video;
  return (
    <div className={"video-card"}>
      <div
        className={"thumbnail"}
        style={{
          backgroundImage: `URL(${snippet.thumbnails.default.url})`
        }}
      />
      <div className={"content"}>
        <div className={"title"}>
          {snippet.title.length > 30
            ? snippet.slice(0, 30) + "..."
            : snippet.title}
          ...
        </div>
        <div className={"channel-title"}>{snippet.channelTitle}</div>
        <div className={"views"}>
          {nFormatter(statistics.viewCount, 1)} Views
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
