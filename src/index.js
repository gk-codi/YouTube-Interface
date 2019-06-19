import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header";
import MainVideo from "./Components/MainVideo";
import VideoCard from "./Components/VideoCard";
import { findVideoDetailsByVideoId } from "./helper";

import youtubeAPI, { default_config } from "./services/YouTube";
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
      },
      autoSuggession: [
        { videoTitle: 'Hey you', videoId: 'jV8B24rSN5o' },
        { videoTitle: 'Hey yous', videoId: 'jV8B24rSN5o' },
        { videoTitle: 'Hey you 1', videoId: 'jV8B24rSN5o' },
        { videoTitle: 'Hey yo 3u', videoId: 'jV8B24rSN5o' },
        { videoTitle: 'Hey you 3', videoId: 'jV8B24rSN5o' },
      ]
    };
  }
  componentDidMount() {
    // this.selectVideo(this.state.defaultVideoId);
  }

  handleSearchInputChange = event => {
    event.preventDefault();
    const search_query = event.target.value;
    this.setState({ search: { ...this.state.search, q: search_query } });
  }
  handleSubmitEvents = event => {
    event.preventDefault();
    this.getVideosBySearchQuery();
  }

  getVideosBySearchQuery = () => {
    youtubeAPI
      .get("/search", {
        params: {
          part: "snippet",
          q: this.state.search.q,
          ...default_config
        }
      })
      .then(response => {
        console.log('response => ', response)
        if (
          response.data.items !== undefined &&
          response.data.items.length > 0
        ) {
          if (response.data.items.length > 0) {
            this.selectVideo(response.data.items[0].id.videoId);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getChannelDetails = channelId => {
    youtubeAPI
      .get("/channels", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: channelId,
          ...default_config
        }
      })
      .then(response => {
        if (
          response.data.items !== undefined &&
          response.data.items.length > 0
        ) {
          this.setState({ channelDetails: response.data.items[0] });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  getRelatedVideosDetails = videoIds => {
    youtubeAPI
      .get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoIds.toString(),
          ...default_config
        }
      })
      .then(response => {
        if (
          response.data.items !== undefined &&
          response.data.items.length > 0
        ) {
          const relatedVideosDetails = response.data.items;
          this.setState({ relatedVideosDetails });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  getRelatedVideos = videoId => {
    youtubeAPI
      .get("/search", {
        params: {
          part: "snippet",
          relatedToVideoId: videoId,
          type: "video",
          ...default_config
        }
      })
      .then(response => {
        const videoIds = response.data.items.map(video => {
          return video.id.videoId
        })
        this.setState({ relatedVideos: response.data.items });
        this.getRelatedVideosDetails(videoIds)
      })
      .catch((error) => {
        // alert(2);
      });
  }
  getVideoDetails = (videoId, channelId) => {
    if (channelId !== undefined) {
      this.getChannelDetails(channelId);
    }
    youtubeAPI
      .get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
          ...default_config
        }
      })
      .then(response => {
        if (
          response.data.items !== undefined &&
          response.data.items.length > 0
        ) {
          const video = response.data.items[0];
          this.setState({ video });
          this.getRelatedVideos(videoId);
          if (channelId === undefined) {
            this.getChannelDetails(video.snippet.channelId);
          }
        }
      })
      .catch(error => {
        console.error("error 1 =>", error);
      });
  }

  selectVideo = (videoId, channelId) => {
    this.setState({ videoId });
    this.getVideoDetails(videoId, channelId);
  }

  render() {
    const {
      currentPageClass,
      videoId,
      relatedVideos,
      relatedVideosDetails,
      video,
      channelDetails,
      search,
      autoSuggession
    } = this.state;
    const { handleSearchInputChange, handleSubmitEvents, selectVideo } = this;

    return (
      <div className={`app ${currentPageClass}`}>
        <div className={"header"}>
          <Header
            handleSearchInputChange={handleSearchInputChange}
            handleSubmitEvents={handleSubmitEvents}
            search={search}
            autoSuggession={autoSuggession}
            selectVideo={selectVideo}
          />
          {
          autoSuggession.length > 0 ? <AutoSuggession videoList={autoSuggession} selectVideo={selectVideo} /> : null
          }
        </div>
        {video !== null && channelDetails !== null ? (
          <AppContent {...{ relatedVideos, relatedVideosDetails, videoId, video, channelDetails, selectVideo }} />
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
  channelDetails,
  selectVideo
}) => {
  return (
    <div className={"content-wrapper"}>
      <div className={"main-video"}>
        <MainVideo video={video} channelDetails={channelDetails} />
      </div>
      <div className={"sidebar"}>
        <h3>Up next</h3>
        <div className={"videos-list"}>

          {relatedVideos.map(({ id }) => {
            const videoItem = findVideoDetailsByVideoId(
              relatedVideosDetails,
              id.videoId
            );
            if (videoItem !== undefined) {
              return <VideoCard key={videoItem.id} video={videoItem} selectVideo={selectVideo} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

const AutoSuggession = ({ videoList, selectVideo }) => {
  return (
    <div className={'suggession-wrapper'}>
      <div className={'auto-suggession'}>
        {
          videoList.map((video, index) => {

            return (
              <div key={index} className={'item'} onClick={event => {
                event.preventDefault();
                console.log()
                selectVideo(video.videoId)

              }}>
               <span>{video.videoTitle}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
