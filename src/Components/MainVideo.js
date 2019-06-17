import React from "react";

import "../videos.css";
const MainVideo = () => {
  return (
    <div className={"video-wrapper"}>
      <iframe
        width={560}
        height={315}
        src="https://www.youtube.com/embed/jV8B24rSN5o"
        frameBorder={0}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className={"video-descriptions"}>
        <div className={"title-bar"}>
          <h2>CSS Grid Layout Crash Course</h2>
          <div className={"views-wrapper"}>
            <span className={"views"}>797,805 views</span>
          </div>
        </div>
        <div className={"descriptions-contents"}>
          <div className={"channel-bar"}>
            <div className={"image"}>
              <img
                src={
                  "https://yt3.ggpht.com/a/AGF-l7_nC4ETFJCKV-TU3J1RLr2k3HVT25vVXMAiYw=s176-mo-c-c0xffffffff-rj-k-no"
                }
                alt={"Channel"}
              />
            </div>
            <div className={"title"}>
              <h3>Traversy Media</h3>
              <span className={"publish-date"}>Published on Aug 1, 2017</span>
            </div>
            <div className={"subscribe"}>
              <button className={"subscribe-button"}>Subscribe 772K</button>
            </div>
          </div>
          <div className={"channel-description"}>
            <div className={"content"}>
              <p>
                In this video we will look at the new CSS Grid layout and how to
                create grid based layouts and alignments. We will look at
                properties for containers and items.
              </p>

              <span className={"show-more"}>Show more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainVideo;
