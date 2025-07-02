import React, { useEffect } from 'react'
import Lottie from 'lottie-react';
import VerifyAnimation from '../assets/VerifyAnimation.json'
import CryptoJS from "crypto-js";

function encryptWithPBKDF2(plainText, password) {
  const salt = CryptoJS.lib.WordArray.random(16);
  const iv = CryptoJS.lib.WordArray.random(16);

  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA256
  });

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }); 

  return {
    ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
    iv: CryptoJS.enc.Base64.stringify(iv),
    salt: CryptoJS.enc.Base64.stringify(salt)
  };
}


const Waiting = ({details, setStatus}) => {

  const from = details.anonymity ? "someone" : details.name;
  const email_message = `Hi ${details.recepient}, you have a secret message from ${from}.`;
  const more = details.extra ? `<br><br>They say: ${details.extra}<br><br>` : "<br>";
  const final = email_message + more;





  let api_message = {
  sender_name:details['name'],
  sender_anon:details['anonymity'],
  rec_name:details['recepient'],
  rec_email:details['email'],
  rec_mess:final,
  mess_enc:"",
  pass_hash:"",
  salt:"",
  retry_limit:details['retries'],
  retry_count:0,
  ttl:details['ttl'],
  view_limit:details['views'],
  view_count:0,
  }; 

  console.log(details);
  //encrypt message
const password = details['password'].trim();
const message = details['message'].trim();

  const result = encryptWithPBKDF2(message, password);
  const { ciphertext, salt, iv } = result;
  const pass_hash = CryptoJS.SHA256(password + salt.toString()).toString();
  
  api_message['salt'] = salt
  api_message['pass_hash'] = pass_hash;
  api_message['mess_enc'] = ciphertext;
  api_message['iv'] = iv


  useEffect(() => {
  fetch('https://qbyph4mha7.execute-api.ca-central-1.amazonaws.com/dev/submit-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(api_message)
  })
  .then(response => {
    if (!response.ok) {
      console.log("ERROR: ", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      console.log("The message was stored successfully");
      setStatus("success");
    } else {
      console.log("There was an issue in storing the message");
      setStatus("error");
    }
  })
  .catch(error => {
    console.log('Error', error);
    setStatus("error");
  });
}, []);



  return (
      <div className='loading-page'>
          <div className='w-and-v-light-bg'>
                  <h1 className='whisper-light-bg'>whisper</h1>
                  <h1 className='and-light-bg'>&</h1>
                  <h1 className='vault-light-bg'>vault</h1>
          </div>
          <div className='loading-block'>
              <div className='loading-message'>
              <p>sending your message...</p>
              </div>
              <div className='loading-animation'>
                  <Lottie
                  animationData={VerifyAnimation}
                  loop
                  autoplay
              />
              </div>
          </div>

      </div>
    )
}

export default Waiting