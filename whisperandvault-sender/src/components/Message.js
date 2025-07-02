import React from 'react'

const Message = ({message, setMessage, password, setPassword}) => {
    return (
    <div className='message-section'>
      <form className='message-form'>
        <label className='text-input'>
          Message
          <textarea
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}/>
        </label>
        <label className='text-input'>
          Password
          <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </label>
      </form>
    </div>
  )
}


export default Message