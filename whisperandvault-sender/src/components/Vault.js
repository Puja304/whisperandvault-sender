
import React, { useEffect } from 'react'
import { useState } from 'react'
import UserDetails from './UserDetails'
import RecepientDetails from './RecepientDetails'
import Limits from './Limits'
import Message from './Message'
import Extra from './Extra'

const Vault = (props) => {

  let setMode = props.setMode;
  let setDetails = props.setDetails
  const formTypes = ['user-details', 'recepient-details','limits','message','extra'];
  const [formNum, setFormNum] = useState(0);
  const [formType, setFormType] = useState(formTypes[formNum]);

const handleFormUser = () => {
    setDetails(prevDetails => ({
        ...prevDetails,
        name: props.username,
        anonymity: props.anonymity
        }));
  };

    const handleFormRecepient = () => {
    setDetails(prevDetails => ({
        ...prevDetails,
        recepient: props.recepient,
        email: props.email
        }));
  };

    const handleFormLimit = () => {
    setDetails(prevDetails => ({
        ...prevDetails,
        retry: props.retry,
        views: props.views
        }));
  };

    const handleFormMessage = () => {
    setDetails(prevDetails => ({
        ...prevDetails,
        message: props.message,
        }));
  };

    const handleFormPasswordExtra = () => {
    setDetails(prevDetails => ({
        ...prevDetails,
        password: props.password,
        extra: props.extra
        }));
  };


  const handleFormButton = () => {

    if (formNum == 0){
      handleFormUser();
    }
    else if (formNum == 1){
      handleFormRecepient();
    }
    else if (formNum == 2){
      handleFormLimit();
    }
    else if (formNum == 3){
      handleFormMessage();
    }
    else{
      handleFormPasswordExtra();
    }

    if (formNum == 4)
    {
      setMode('submission')
    }
    else{

      const nextFormNum = formNum + 1;
      setFormNum(nextFormNum);
      setFormType(formTypes[nextFormNum]);
    }
  }


    const handleBackButton = () => {
    if (formNum > 0){
      const prevFormNum = formNum - 1;
      setFormNum(prevFormNum);
      setFormType(formTypes[prevFormNum]);
    }
  }

    //set max views and ttl to 1 for all messages sent through vault
    useEffect(() => {
        setDetails(prevDetails => ({
        ...prevDetails,
        views: 1,
        ttl:1
        }));
    }, [])

  return (
    <div className='vault-page'>
      <div className='vault-title'>Vault</div>
      <div className='vault-forms'>
        <div className='vault-form'>
          {formType == 'user-details' && <UserDetails username={props.username} setUsername={props.setUsername} anonymity={props.anonymity} setAnonymity={props.setAnonymity}/>}
          {formType == 'recepient-details' && <RecepientDetails recepient={props.recepient} setRecepient={props.setRecepient} email={props.email} setEmail={props.setEmail}/>}
          {formType == 'limits' && <Limits setDetails={setDetails}/>}
          {formType == 'message' && <Message setDetails={setDetails}/>}
          {formType == 'extra' && <Extra setDetails={setDetails}/>}
        </div>
        <div className='submit-div'>
          <button className={(formNum > 0) ? 'back-button' : 'back-invisible'} onClick={handleBackButton}>Back</button>
          <button className='submit-button' onClick={handleFormButton}>{formNum == 4 ? "Submit" : "Next"}</button>
        </div>
      </div>
    </div>
  )
}

export default Vault