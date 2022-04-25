import React, {useState} from 'react'
// import PDF from './PDF'


const PDFRender = () => {
  const [show, setShow] = useState(false)
  const [t, setT] = useState(1)

  const handleClick = () => {
    setShow(!show)
    setT(t+1)
  }

  return (
    <div>
      <button className='toggle' onClick={handleClick}>toggle{show ? 'true': 'false'}</button>
      {/* <PDF url={`/test.pdf?t=${t}`} style={{display: show ? 'block' : 'none'}} /> */}
      {show && <div>ces</div>}
    </div>
  )
}

export default PDFRender