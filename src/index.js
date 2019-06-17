import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header";
import MainVideo from "./Components/MainVideo";
import VideoCard from "./Components/VideoCard";
import { findVideoDetailsByVideoId } from "./helper";

import youtubeAPI from "./services/YouTube";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageClass: "main-page",
      videoId: null,
      video: null,
      channelDetails: null,
      relatedVideos: [],
      relatedVideosDetails: [],
      defaultVideoId: "jV8B24rSN5o",
      search: {
        q: ""
      }
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSubmitEvents = this.handleSubmitEvents.bind(this);
  }
  componentDidMount() {
    this.selectVideo(this.state.defaultVideoId);
  }

  handleSearchInputChange(event) {
    event.preventDefault();
    const search_query = event.target.value;
    this.setState({ search: { ...this.state.search, q: search_query } });
  }
  handleSubmitEvents(event) {
    event.preventDefault();
    this.getVideosBySearchQuery();
  }

  getVideosBySearchQuery() {
    youtubeAPI
      .get("/search", {
        params: {
          part: "snippet",
          q: this.state.search.q
        }
      })
      .then(response => {
        if (response.items !== undefined && response.items.length > 0) {
          this.selectVideo(response.items[0]);
        }
      })
      .carch(error => {
        console.error(error);
      });
  }

  getChannelDetails(channelId) {
    youtubeAPI
      .get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: channelId
        }
      })
      .then(response => {
        if (response.items !== undefined && response.items.length > 0) {
          this.setState({ channelDetails: response.items[0] });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  getRelatedVideosDetails(videoIds) {
    youtubeAPI
      .get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoIds.toString()
        }
      })
      .then(response => {
        if (response.items !== undefined && response.items.length > 0) {
          const relatedVideosDetails = response.items;
          this.setState(relatedVideosDetails);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getRelatedVideos(videoId) {
    youtubeAPI
      .get("/search", {
        params: {
          part: "snippet",
          relatedToVideoId: videoId,
          type: "video"
        }
      })
      .then(function(response) {
        this.setState({ relatedVideos: response.items });
      })
      .catch(function(error) {
        console.log(error);
        // alert(2);
      });
  }
  getVideoDetails(videoId, channelId) {
    if (channelId !== undefined) {
      this.getChannelDetails(channelId);
    }
    youtubeAPI
      .get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId
        }
      })
      .then(response => {
        if (response.items !== undefined && response.items.length > 0) {
          const video = response.items[0];
          this.setState({ video });
          if (channelId === undefined) {
            this.getChannelDetails(video.snippet.channelId);
            this.getRelatedVideos(videoId);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  selectVideo(videoId, channelId) {
    this.setState({ videoId });
    this.getVideoDetails(videoId, channelId);
  }

  render() {
    const {
      currentPageClass,
      videoId,
      relatedVideos,
      video,
      channelDetails,
      search
    } = this.state;
    const { handleSearchInputChange, handleSubmitEvents } = this;
    return (
      <div className={`app ${currentPageClass}`}>
        <div className={"header"}>
          <Header
            handleSearchInputChange={handleSearchInputChange}
            handleSubmitEvents={handleSubmitEvents}
            search={search}
          />
        </div>
        {video !== null && channelDetails !== null ? (
          <AppContent {...{ relatedVideos, videoId, video, channelDetails }} />
        ) : null}
      </div>
    );
  }
}

const AppContent = ({
  relatedVideos,
  relatedVideosDetails,
  videoId,
  video,
  channelDetails
}) => {
  return (
    <div class={"content-wrapper"}>
      <div className={"main-video"}>
        <MainVideo video={video} channelDetails={channelDetails} />
      </div>
      <div className={"sidebar"}>
        <h3>Up next</h3>
        <div className={"videos-list"}>
          {relatedVideos.map(({ id }) => {
            const video = findVideoDetailsByVideoId(
              relatedVideosDetails,
              id.videId
            );
            if (video !== undefined) {
              return <VideoCard video={video} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
