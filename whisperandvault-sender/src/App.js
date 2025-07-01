import './App.css';
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

function App() {

  let message = "This service works :)";
  let password = "correct";

  let api_message = {
  sender_name:"puja",
  sender_anon:true,
  rec_name:"mysteryman",
  rec_email:"puja.shah321@gmail.com",
  rec_mess:"someone sent you an anonymous message",
  mess_enc:"",
  pass_hash:"",
  salt:"",
  retry_limit:10,
  retry_count:0,
  hint:"sdihfsd",
  hint_thresh:-1,
  ttl:"01:00:00",
  view_limit:-1,
  view_count:0,
  current_time:"12:13:14:15"
  }; 


  //encrypt message
const result = encryptWithPBKDF2(message, password);
const { ciphertext, salt, iv } = result;
const pass_hash = CryptoJS.SHA256(password + salt.toString()).toString();

api_message['salt'] = salt
api_message['pass_hash'] = pass_hash;
api_message['mess_enc'] = ciphertext;
api_message['iv'] = iv

    
const handleSubmit = async () => {
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
    .then((data => {

        if (data.success){
          console.log("The message was stored successfully")
        }
        else{
            console.log("There was an issue in storing the message")
        }
    }))
    .catch(error => {
        console.log('Error', error);
    });
    }


  return (
    <div className="App">
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
