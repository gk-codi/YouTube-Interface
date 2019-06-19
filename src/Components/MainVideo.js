import React from "react";
import { nFormatter, getHumanDate } from "../helper";
import "../videos.css";
const MainVideo = ({ video, channelDetails }) => {
  const { id, snippet: videoSnippet, statistics } = video;
  const {
    snippet: channelSnippet,
    statistics: channelStatistics
  } = channelDetails;
  return (
    <div className={"video-wrapper"}>
      <iframe
        width={560}
        height={315}
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder={0}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.snippet.title}
      />
      <div className={"video-descriptions"}>
        <div className={"title-bar"}>
          <h2>{videoSnippet.title}</h2>
          <div className={"views-wrapper"}>
            <span className={"views"}>
              {nFormatter(statistics.viewCount, 2)} views
            </span>
          </div>
        </div>
        <div className={"descriptions-contents"}>
          <div className={"channel-bar"}>
            <div className={"image"}>
              <img
                src={channelSnippet.thumbnails.default.url}
                alt={channelSnippet.title}
              />
            </div>
            <div className={"title"}>
              <h3>{channelSnippet.title}</h3>
              <span className={"publish-date"}>
                Published on {getHumanDate(videoSnippet.publishedAt)}
              </span>
            </div>
            <div className={"subscribe"}>
              <button className={"subscribe-button"}>
                Subscribe {nFormatter(channelStatistics.subscriberCount, 1)}}
              </button>
            </div>
          </div>
          <div className={"channel-description"}>
            <div className={"content"}>
              <p>{videoSnippet.description}</p>

              <span className={"show-more"}>Show more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainVideo;
