import React, { useRef, useEffect, useState } from "react";
import * as pdfLib from "pdfjs-dist";
import * as pdfV from "pdfjs-dist/web/pdf_viewer";
console.log(pdfLib, pdfV);

const { GlobalWorkerOptions, getDocument } = pdfLib;
// console.log('pdfLib.GlobalWorkerOption', pdfLib.GlobalWorkerOptions)
GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
const { PDFViewer, EventBus, PDFLinkService } = pdfV;

// let viewerer = null
const eventBus = new EventBus();
const linkService = new PDFLinkService();

let pdfDoc = null;
// let task = null;

let loadingTasks =[]
let pdfDocList = []
let viewererList = []

const PDFRender = (props) => {
  const containerRef = useRef();
  const viewerRef = useRef();

  useEffect( () => {
    (async () => {
        const viewerer = new PDFViewer({
            container: containerRef.current,
            viewer: viewerRef.current,
            eventBus,
            linkService,
          });
      
          const task = getDocument(props.url);
          loadingTasks.push(task)
          console.log("task", task);
          const pdf = await task.promise
          viewerer.setDocument(pdf);
          pdfDocList.push(pdf)
          // console.log('pdfDoc', pdfDoc)
          console.log('viewerer', viewerer)
          viewererList.push(viewerer)
        //   window.viewerer = viewerer
          console.log('---loadingTasks--', loadingTasks)
    })()
    return async () => {
        console.log('==loadingTasks==', loadingTasks)
        loadingTasks.forEach(async (lt) => {
            await lt.destroy()
            console.log('2222222222', lt.destroyed)

        });
        loadingTasks.splice(0)
        pdfDocList.forEach(async (lt) => {
            await lt.destroy()
        })
        pdfDocList.splice(0)
        viewererList.forEach((v) => {
            v.setDocument(null)
            v.linkService.setDocument(null)
            v.linkService?.setViewer(null)
            v.linkService = null
        })
        viewererList.splice(0)
    //   if (task) {
    //     await task.destroy();
    //     // task.destroy();
    //   }
    //   if (pdfDoc) {
    //     await pdfDoc.destroy();
    //   }
    };
  }, [props.url]);

  return (
    <div className="_container" ref={containerRef}>
      <div className="_viewer" ref={viewerRef}></div>
    </div>
  );
};

export default PDFRender;
