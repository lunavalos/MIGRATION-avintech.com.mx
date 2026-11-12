'use client'

import React, { useState } from 'react'

export interface PlaylistVideo {
  title: string
  youtubeId: string
  duration: string
}

export function VideoPlaylist({
  playlistTitle,
  videos,
}: {
  playlistTitle: string
  videos: PlaylistVideo[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeVideo = videos[activeIndex] || videos[0]

  if (!activeVideo) return null

  return (
    <div className="av-playlist">
      <div className="av-playlist-sidebar">
        <div className="av-playlist-header">
          <h3>{playlistTitle}</h3>
          <span>{videos.length} Videos</span>
        </div>

        <div className="av-playlist-items">
          {videos.map((v, idx) => (
            <button
              key={v.youtubeId}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`av-playlist-item ${idx === activeIndex ? 'active' : ''}`}
            >
              <div className="av-playlist-thumb-wrap">
                <img
                  src={`https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`}
                  alt={v.title}
                  className="av-playlist-thumb"
                />
                <span className="av-playlist-play-icon" aria-hidden="true">
                  <svg viewBox="0 0 512 512" fill="currentColor" width="14" height="14">
                    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" />
                  </svg>
                </span>
              </div>
              <span className="av-playlist-item-title">{v.title}</span>
              <span className="av-playlist-duration">{v.duration}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="av-playlist-player">
        <iframe
          src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0`}
          title={activeVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
