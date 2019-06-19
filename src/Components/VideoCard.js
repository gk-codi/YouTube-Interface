import React from "react";
import { nFormatter } from "../helper";
import "../video-card.css";

const VideoCard = ({video,selectVideo}) => {
  const { id, snippet, statistics, contentDetails } = video;
  return (
    <div key={id} className={"video-card"} onClick={ event => {
      event.preventDefault();
      selectVideo(id, snippet.channelId)
    }}>
      <div
        className={"thumbnail"}
        style={{
          backgroundImage: `URL(${snippet.thumbnails.default.url})`
        }}
      />
      <div className={"content"}>
        <div className={"title"}>
          {snippet.title.length > 30
            ? snippet.title.slice(0, 30) + "..."
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
