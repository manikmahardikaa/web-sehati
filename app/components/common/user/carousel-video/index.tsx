"use client";

import { Carousel } from "antd";
import React from "react";
import { FilmDataModel } from "@/app/models/admin/film";

const carouselWrapperStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  borderRadius: 20,
  overflow: "hidden",
  background: "#000",
  boxShadow: "0 8px 32px 0 rgba(180,30,30,0.09)",
  position: "relative",
};

// Untuk aspect ratio tanpa blank space bawah
const aspectRatioBox: React.CSSProperties = {
  width: "100%",
  position: "relative",
  height: 1000,
  background: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: "56.25%", // 16:9 (9/16*100)
};

const contentMediaStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  objectFit: "cover",
  border: 0,
  borderRadius: 0,
};

const captionStyle: React.CSSProperties = {
  position: "absolute",
  left: 24,
  bottom: 24,
  color: "#fff",
  background: "rgba(34, 34, 34, 0.7)",
  padding: "8px 18px",
  borderRadius: 12,
  fontWeight: 600,
  fontSize: 19,
  maxWidth: "80%",
  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
  letterSpacing: 0.2,
};

const VideoCarousel = ({ filmData }: { filmData: FilmDataModel[] }) => {
  if (!Array.isArray(filmData)) return null;

  const published = filmData.filter((item) => item.is_published);

  return (
    <div style={carouselWrapperStyle}>
      <Carousel autoplay dots>
        {published.map((item, idx) => (
          <div key={item.id || idx} style={aspectRatioBox}>
            {item.video_url.includes("youtube") ||
            item.video_url.includes("youtu.be") ? (
              <iframe
                src={
                  item.video_url.includes("youtu.be")
                    ? `https://www.youtube.com/embed/${
                        item.video_url.split("/").pop()?.split("?")[0]
                      }`
                    : item.video_url.replace("watch?v=", "embed/")
                }
                style={contentMediaStyle}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={item.name}
              />
            ) : (
              <video
                style={contentMediaStyle}
                controls
                muted
                poster={item.thumbnail_url}
                src={item.video_url}
              />
            )}
            <div style={captionStyle}>{item.name}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
