import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Constants
const STARTING_VIDEO_ID = 9750; // Change this to start from any video ID
const VIDEOS_PER_PAGE = 10;
const TARGET_URL = "https://www.blackbox.ai/recorded-sessions/blackbox_assistant_room_1";


const Temp = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchVideo = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/api/blackbox/${id}`);
      const data = await response.json();
      return { id, ...data };
    } catch (error) {
      console.error(`Error fetching video ${id}:`, error);
      return { id, exists: false };
    }
  };

  const loadVideos = async (page) => {
    setLoading(true);
    const startId = STARTING_VIDEO_ID + ((page - 1) * VIDEOS_PER_PAGE);
    const endId = startId + VIDEOS_PER_PAGE - 1;
    
    for (let i = startId; i <= endId; i++) {
      const videoData = await fetchVideo(i);
      setVideos(prev => [...prev, videoData]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVideos(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setVideos([]); // Clear current videos
    setSelectedVideo(null); // Reset selected video
    setCurrentPage(prev => prev + 1); // Increment page
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video.id === selectedVideo ? null : video.id);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: "thumbnail-slider"
  };

  if (loading && videos.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Video Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-gray-800 rounded p-4">
            {video.exists ? (
              <div>
                {selectedVideo === video.id ? (
                  <div>
                    <video 
                      src={video.videoUrl} 
                      controls 
                      className="w-full mb-2"
                    />
                  </div>
                ) : (
                  <div className="cursor-pointer">
                    <div className="mb-2">
                      <Slider {...sliderSettings}>
                        {video?.thumbnailUrls?.map((thumbnail, index) => (
                          <div key={index} className="px-1">
                            <img 
                              src={thumbnail}
                              alt={`Thumbnail ${index + 1} for Video ${video.id}`}
                              className="w-full h-48 object-cover rounded"
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                    <div className="text-center">
                      <button 
                        className="bg-blue-500 px-4 py-2 rounded"
                        onClick={() => handleVideoClick(video)}
                      >
                        Play Video {video.id}
                      </button>
                    </div>
                  </div>
                )}
                <h2 className="text-lg mt-2">Video {video.id}</h2>
              </div>
            ) : (
              <div className="text-center p-4">
                <h2 className="text-lg">Video {video.id}</h2>
                <p className="text-gray-400">Not available</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={handleLoadMore}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded text-lg font-semibold"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load Next 10 Videos'}
        </button>
      </div>

      <style jsx>{`
        .thumbnail-slider .slick-prev,
        .thumbnail-slider .slick-next {
          z-index: 1;
        }
        .thumbnail-slider .slick-prev {
          left: 5px;
        }
        .thumbnail-slider .slick-next {
          right: 5px;
        }
        .thumbnail-slider .slick-dots {
          bottom: -25px;
        }
        .thumbnail-slider .slick-dots li button:before {
          color: white;
        }
        .thumbnail-slider .slick-dots li.slick-active button:before {
          color: #3B82F6;
        }
      `}</style>
    </div>
  );
};

export default Temp;
