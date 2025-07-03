
import React, { useEffect } from 'react'
import { useState } from 'react'
import UserDetails from './UserDetails'
import RecepientDetails from './RecepientDetails'
import Message from './Message'
import Extra from './Extra'

const Vault = (props) => {

  let setMode = props.setMode;
  let setDetails = props.setDetails
  const formTypes = ['user-details', 'recepient-details','message','extra'];
  const [formNum, setFormNum] = useState(0);
  const [formType, setFormType] = useState(formTypes[formNum]);
  const [submitError, setSubmitError] = useState(false);

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

    const handleFormMessage = () => {
    setDetails(prevDetails => ({
        ...prevDetails,
        message: props.message,
        password: props.password
        }));
  };

    const handleFormExtra = () => {
    setDetails(prevDetails => ({
        ...prevDetails,
        extra: props.extra,
        views: props.views,
        retries:props.retry
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
      handleFormMessage();
    }
    else{
      handleFormExtra();
    }

    if (formNum == 3)
    {
      if (
      props.password !== "" &&
      props.message !== "" &&
      props.username !== "" &&
      props.recepient !== "" &&
      props.email !== ""
      ){
        setMode('submission')
      }
      else{
          setSubmitError(true);
          setTimeout(() => {
            setSubmitError(false);
          },3000);
      }
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
        ttl:1,
        retries:1
        }));

        props.setRetry(1);
        props.setViews(1);
    }, [])

  return (
    <div className='vault-page'>
      <div className="vault-title">
        <p>Vault</p>
        <p className='vault-tag'>One message. One view. One day.</p>

      </div>
      <div className='vault-forms'>
        <div className='vault-form'>
          {formType == 'user-details' && <UserDetails username={props.username} setUsername={props.setUsername} anonymity={props.anonymity} setAnonymity={props.setAnonymity}/>}
          {formType == 'recepient-details' && <RecepientDetails recepient={props.recepient} setRecepient={props.setRecepient} email={props.email} setEmail={props.setEmail}/>}
          {formType == 'message' && <Message message={props.message} setMessage={props.setMessage} password={props.password} setPassword={props.setPassword}/>}
          {formType == 'extra' && <Extra mode={props.mode} extra={props.extra} setExtra={props.setExtra} views={props.views} setViews={props.setViews} retry={props.retry} setRetry={props.setRetry}/>}
        </div>
         <div className='spacer'></div>
        <div className='submit-div'>
          <button className={(formNum > 0) ? 'back-button' : 'back-invisible'} onClick={handleBackButton}>Back</button>
          <button className='submit-button' onClick={handleFormButton}>{formNum == 3 ? "Submit" : "Next"}</button>
        </div>
      </div>
        {submitError && (
            <div className='error-popup'>
                All text fields not marked optional must have a value
            </div>
        )}
    </div>
  )
}

export default Vault