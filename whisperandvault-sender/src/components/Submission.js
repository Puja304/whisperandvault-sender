import React, { useState } from 'react'
import Waiting from './Waiting'
import Error from './Error'
import Success from './Success'

const Submission = ({details}) => {
  const [status, setStatus] = useState("waiting")
    return (
      <>
      {status == "waiting" && <Waiting details={details} setStatus={setStatus}/>}
      {status == "error" && <Error/>}
      {status == "success" && <Success/>}
      </> 
  )
}


export default Submission