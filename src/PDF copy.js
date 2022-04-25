import React, { useRef, useEffect, useState } from "react";
import * as pdfLib from "pdfjs-dist";
import  * as pdfV from "pdfjs-dist/web/pdf_viewer";
// console.log(pdfLib, pdfV);

const { GlobalWorkerOptions, getDocument } = pdfLib;
// console.log('pdfLib.GlobalWorkerOption', pdfLib.GlobalWorkerOptions)
GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
const { PDFViewer, EventBus, PDFLinkService } = pdfV;

// let viewerer = null
let eventBus ;
let linkService = null;

// let pdfDoc = null;
// let task = null;

let loadingTasks = [];
let pdfDocList = [];
// let viewererList = [];
let viewerer = null;

const PDFRender = (props) => {
  const containerRef = useRef();
  const viewerRef = useRef();
  if (!linkService) {
    linkService = new PDFLinkService();
  }

  if (!eventBus) {
    eventBus = new EventBus();
  }

  useEffect(() => {
    (async () => {
      viewerer = new PDFViewer({
        container: containerRef.current,
        viewer: viewerRef.current,
        eventBus,
        linkService,
      });

      const task = getDocument({
        url: props.url,
        disableAutoFetch: true
      });
      loadingTasks.push(task);
      // console.log("task", task);
      const pdf = await task.promise;
      viewerer.setDocument(pdf);
      pdfDocList.push(pdf);
      // console.log('pdfDoc', pdfDoc)
      // console.log("viewerer", viewerer);
      // viewererList.push(viewerer)
      //   window.viewerer = viewerer
      // console.log("---loadingTasks--", loadingTasks);
    })();
    return async () => {
      // console.log("==loadingTasks==", loadingTasks);
      
      pdfDocList.forEach(async (lt) => {
        await lt.destroy();
        await lt._transport.destroy()
        lt = null
      });
      pdfDocList.splice(0);

      loadingTasks.forEach(async (lt) => {
        await lt.destroy();
        await lt._transport.destroy()
        lt = null
        // console.log("2222222222", lt.destroyed);
      });
      loadingTasks.splice(0);
      // viewererList.forEach((v) => {
      //     v.setDocument(null)
      //     v.linkService.setDocument(null)
      //     v.linkService?.setViewer(null)
      //     v.linkService = null
      // })
      // viewererList.splice(0)
      if (viewerer) {
        viewerer.setDocument(null);
        viewerer.linkService.setDocument(null);
        viewerer.linkService?.setViewer(null);
        viewerer.cleanup()
        viewerer.container.removeEventListener("scroll", viewerer.scroll._eventHandler, true)
        viewerer.renderingQueue.setViewer(null)
        viewerer.renderingQueue = null
        viewerer.linkService = null;
        viewerer = null
      }

      if (linkService) {
        linkService.setDocument(null);
        linkService.setViewer(null);
        linkService = null;
      }

      eventBus = null;
      // if (eventBus) {
      //   eventBus = null;
      // }
      
    };
  }, [props.url]);

  return (
    <div className="_container" ref={containerRef} style={props.style}>
      <div className="_viewer" ref={viewerRef}></div>
    </div>
  );
};

export default PDFRender;
