import "../App.css";
import React, { useEffect, useRef } from "react";

function Chatbox() {
  const spinnerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const spinner = spinnerRef.current;
    const iframe = iframeRef.current;

    spinner.style.display = "block";

    const handleLoad = () => {
      spinner.style.display = "none";
      iframe.style.display = "inline";
    };

    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  return (
    <div className="lightbox">
      <div className="spinner" ref={spinnerRef}>
        {[...Array(10)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
      <iframe
        id="lightbox-iframe"
        ref={iframeRef}
        src="//bids.responsibid.com/Form/lightbox/appVersion3.3.5/3023f07aa7b3c84edc3fb2ff0bdf14870be8402dc388327c509d5c288c713e7c?referringUrl=https%3A%2F%2Fwww.washthehome.com%2F"
        frameBorder="0"
        title="ResponsiBid Form"
      ></iframe>
    </div>
  );
}

export default Chatbox;
