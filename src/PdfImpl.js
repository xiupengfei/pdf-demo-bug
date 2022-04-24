import * as pdfLib from "pdfjs-dist";
import * as pdfV from "pdfjs-dist/web/pdf_viewer";
console.log(pdfLib, pdfV);

const {GlobalWorkerOptions, getDocument} = pdfLib
// console.log('pdfLib.GlobalWorkerOption', pdfLib.GlobalWorkerOptions)
GlobalWorkerOptions.workerSrc = '/pdf.worker.js'
const {PDFViewer, EventBus, PDFLinkService} = pdfV


let viewerer = null
const eventBus = new EventBus()
const linkService = new PDFLinkService()

let pdfDoc = null
let task = null

class PdfImpl {
  constructor({ container, viewer }) {
    console.log(container, viewer);
    viewerer = new PDFViewer({
        container, 
        viewer,
        eventBus,
        linkService
    })
  }

  destroy() {
      if (pdfDoc) {
        pdfDoc.destroy()
      }
      if (task) {
        task.destroy()
      }
  }

  async render(url) {
    task = getDocument(url)
    console.log('task', task)
    pdfDoc = await task.promise
    console.log('pdfDoc', pdfDoc)
    console.log('viewerer', viewerer)
    viewerer.setDocument(pdfDoc)
  }
}

export default PdfImpl;
