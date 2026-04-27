import { Music } from "lucide-react";
import React, { useState } from "react";


const FloatingVideo: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible ? (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "250px",
            height: "150px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        >
          <button
            onClick={() => setVisible(false)}
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              zIndex: 1001,
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/mcdtAcl94pc`}
            title="YouTube video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="flex justify-center items-center"
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: 1000,
            height: "27px",
            width: "27px",
            borderRadius: "20px",
            border: "none",
            padding: "5px 5px",
            background: "var(--primary)",
            color: "var(--popover)",
            cursor: "pointer",
            boxShadow: "0 4px 7px rgba(0,0,0,0.3)",
          }}
        >
          <Music className="w-4"/>
        </button>
      )}
    </>
  );
};

export default FloatingVideo;
