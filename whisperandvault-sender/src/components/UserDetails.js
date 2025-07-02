import React, { useState } from 'react'

const UserDetails = (props) => {
  let setUsername = props.setUsername;
  let setAnonymity = props.setAnonymity;

    return (
    <div className='user-details'>
      <form className='user-detail-form' onSubmit={(e) => {
                                        e.preventDefault();
                                        }}>
        <label className='text-input'>
          Sender Name
          <input 
          type="text"
          value={props.username}
          onChange={(e) => setUsername(e.target.value)}></input>
        </label>
        <div className='anonymity-choice'>
          <p>How should the recepient receive the email?</p>
            <label>
              <input
                type="radio"
                name="anonymity"
                value="true"
                checked={props.anonymity === true}
                onChange={() => setAnonymity(true)}
              />
              From Anonymous
            </label>
            <label>
              <input
                type="radio"
                name="anonymity"
                value="false"
                checked={props.anonymity === false}
                onChange={() => setAnonymity(false)}
              />
              From Me
            </label>
        </div>
      </form>
    </div>
  )
}


export default UserDetails