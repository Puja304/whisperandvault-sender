import React from 'react'

const Extra = ({mode,extra,setExtra,views,setViews, retry, setRetry}) => {
    return (
    <div className='extra-section'>
      <form className='extra-form'>
        <label className='text-input'>
          Would you like to add a personal message, hint, or reminder in the email? <br/><i>(Optional)</i>
          <textarea
          type='text'
          value={extra}
          onChange={(e) => setExtra(e.target.value)}/>
        </label>
        <label className="retry-label">
        Number of password retries
        <select
          value={retry}
          onChange={(e) => setRetry(parseInt(e.target.value))}
        >
          {mode !== 'vault' && <option value={-1}>Unlimited</option>}
          {(mode === "vault" ? [1, 2, 3] : [1, 2, 3, 4, 5]).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      <label className={mode == 'whisper' ? "retry-label" : "vault-invisible"}>
        Number of views permitted 
        <select
          value={views}
          onChange={(e) => setViews(parseInt(e.target.value))}
        >
          <option value={-1}>Unlimited</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      </form>
    </div>
  )
}


export default Extra