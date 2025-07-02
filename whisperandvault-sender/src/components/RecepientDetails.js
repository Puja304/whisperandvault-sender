import React from 'react'

const RecepientDetails = ({recepient, setRecepient, email, setEmail}) => {
    return (
    <div className='recepient-section'>
      <form className='recepient-form'>
        <label className='text-input'>
           Recepient Name
          <input
          type='text'
          value={recepient}
          onChange={(e) => setRecepient(e.target.value)}/>
        </label>
        <label className='text-input'>
          Email
          <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </label>
      </form>
    </div>
  )
}


export default RecepientDetails