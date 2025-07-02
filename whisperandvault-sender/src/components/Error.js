import React from 'react'

const Error = () => {
 return (
        <div className='error-page'>
            <div className='w-and-v-dark-bg'>
                <h1 className='whisper-dark-bg'>whisper</h1>
                <h1 className='and-dark-bg'>&</h1>
                <h1 className='vault-dark-bg'>vault</h1>
            </div>
            <div className='inform-div'>
                <h1 className='inform-error'>
                    We couldn't send your message&nbsp;:(
                </h1>
                <h3 className='inform-details'>
                    There might be a problem with the email or our servers. Please try again and verify all details
                </h3>
            </div>
        </div>
     )
}

export default Error