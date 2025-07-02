import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import SuccessAnimation from '../assets/SuccessAnimation.json'

const Success = () => {
   const lottieRef = useRef();

  useEffect(() => {
    const anim = lottieRef.current;

    // Delay for ~animation length, then go to final visible frame and stop
    setTimeout(() => {
      anim.goToAndStop(90, true); // adjust 90 to whatever frame looks "complete"
    }, 2000); // Adjust to match animation length
  }, []);


  return(
    <div className='success-page'>
      <div className='w-and-v-dark-bg'>
          <h1 className='whisper-dark-bg'>whisper</h1>
          <h1 className='and-dark-bg'>&</h1>
          <h1 className='vault-dark-bg'>vault</h1>
      </div>
      <div className='inform-div'>
        <div className='success-animation'>
          <Lottie
            lottieRef={lottieRef}
            animationData={SuccessAnimation}
            loop={false}
            autoplay={true}
          />
        </div>
          <h1 className='inform-error'>
              Your message was sent successfully&nbsp;:)
          </h1>
          <h3 className='inform-details'>
              The recepient should have it in their inbox soon
          </h3>
      </div>
        </div>
  );
}

export default Success