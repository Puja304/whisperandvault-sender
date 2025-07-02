import './App.css';
import { useState } from 'react';
import Whisper from './components/Whisper';
import Vault from './components/Vault';
import Submission from './components/Submission';

function App() {
  const [mode, setMode] = useState("whisper");
  const [details, setDetails] = useState({
    name:"",
    anonymity:true,
    recepient:"",
    email:"",
    retries:-1,
    views: -1,
    message:"",
    password:"",
    extra:"",
    ttl:30
  })

  const [username,setUsername] = useState("");
  const [anonymity, setAnonymity] = useState(true);
  const [recepient, setRecepient] = useState("");
  const [email, setEmail] = useState("");
  const [retry, setRetry] = useState(-1);
  const [views, setViews] = useState(-1);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [extra, setExtra] = useState("");

  const toggleMode = () => {
    setMode(prev => (prev === 'whisper' ? 'vault' : 'whisper'));
  };


  return (
    <div className='full-page'>
      {mode !== 'submission' ? (
        <>
          <div className={`toggle-button ${mode}`} onClick={toggleMode}>
            <div className="toggle-circle"></div>
          </div>

          {mode === 'whisper' && <Whisper mode={mode} setMode={setMode} setDetails={setDetails} setUsername={setUsername} setAnonymity={setAnonymity} setRecepient={setRecepient} setEmail={setEmail} setRetry={setRetry} setViews={setViews} setMessage={setMessage} setPassword={setPassword} setExtra={setExtra} username={username} anonymity={anonymity} recepient={recepient} email={email} retry={retry} views={views} message={message} password={password} extra={extra}/>}
          {mode === 'vault' && <Vault mode={mode} setMode={setMode} setDetails={setDetails} setUsername={setUsername} setAnonymity={setAnonymity} setRecepient={setRecepient} setEmail={setEmail} setRetry={setRetry} setViews={setViews} setMessage={setMessage} setPassword={setPassword} setExtra={setExtra} username={username} anonymity={anonymity} recepient={recepient} email={email} retry={retry} views={views} message={message} password={password} extra={extra}/>}
        </>
      ) : (
        <Submission details={details} />
      )}
    </div>
  );
}

export default App;
