import React, { useRef, useEffect, useState } from "react";
import PdfImpl from "./PdfImpl";

let pdfimpl = null;

const PDFRender = (props) => {

  const containerRef = useRef();
  const viewerRef = useRef();

  useEffect(() => {
    pdfimpl = new PdfImpl({
      container: containerRef.current,
      viewer: viewerRef.current,
    });

    pdfimpl.render(props.url);

    return () => {
      pdfimpl.destroy();
    };
  }, [props.url]);

  return (
    <div className="_container" ref={containerRef}>
      <div className="_viewer" ref={viewerRef}></div>
    </div>
  );
};

export default PDFRender;
