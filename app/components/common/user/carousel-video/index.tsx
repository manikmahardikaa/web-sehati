"use client";

import { Carousel } from "antd";
import React from "react";
import { FilmDataModel } from "@/app/models/admin/film";

const wrapperStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  borderRadius: 20,
  overflow: "hidden",
  background: "#000",
  boxShadow: "0 8px 32px rgba(180,30,30,0.09)",
  position: "relative",
};

const slideOuter: React.CSSProperties = {
  position: "relative",
  width: "100%",
  background: "#000",
};

const ratioBox: React.CSSProperties = {
  position: "relative",
  width: "100%",
  // kunci 16:9 yang stabil untuk slick
  paddingTop: "56.25%", // 9/16 * 100
};

const media: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  border: 0,
};

const caption: React.CSSProperties = {
  position: "absolute",
  left: 20,
  bottom: 20,
  color: "#fff",
  background: "rgba(0,0,0,0.55)",
  padding: "10px 16px",
  borderRadius: 12,
  fontWeight: 600,
  fontSize: 18,
  maxWidth: "80%",
  lineHeight: 1.25,
  backdropFilter: "blur(2px)",
};

const VideoCarousel = ({ filmData }: { filmData: FilmDataModel[] }) => {
  if (!Array.isArray(filmData)) return null;
  const published = filmData.filter((item) => item.is_published);

  return (
    <div className="video-carousel" style={wrapperStyle}>
      <Carousel autoplay dots>
        {published.map((item, idx) => {
          const isYT =
            item.video_url.includes("youtube") ||
            item.video_url.includes("youtu.be");

          const ytId = item.video_url.includes("youtu.be")
            ? item.video_url.split("/").pop()?.split("?")[0]
            : item.video_url.split("v=")[1]?.split("&")[0];

          const ytSrc = `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`;

          return (
            <div key={item.id || idx} style={slideOuter}>
              <div className="ratio" style={ratioBox}>
                {isYT ? (
                  <iframe
                    src={ytSrc}
                    style={media}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={item.name}
                  />
                ) : (
                  <video
                    style={media}
                    controls
                    muted
                    poster={item.thumbnail_url}
                    src={item.video_url}
                  />
                )}
                <div style={caption}>{item.name}</div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
