import React, {useState} from 'react'
import PDF from './PDF'


const PDFRender = () => {
  const [show, setShow] = useState(true)

  return (
    <div>
      <button className='toggle' onClick={() => setShow(!show)}>toggle{show}</button>
      {
        show && (<PDF url={"/test.pdf"} />)
      }
    </div>
  )
}

export default PDFRender