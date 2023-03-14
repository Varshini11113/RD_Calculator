import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";


export default function CollapsibleBox({ heading, headingBold = true, content = "", isFormula = false, isLast = false , isSidePanel = false}) {
  const [isOpen, setIsOpen] = useState(false);

  let weight = 400;
  if (headingBold) {
    weight = 600;
  }

  const style = {
    cursor: 'pointer',
    fontWeight: weight,
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.5rem 0.5rem 10px 0',
  }

  function lineMarginHandle(){
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Collapsible
        trigger={[<div className='pr-[15px] -mb-[10px] font-semibold'>{heading}</div>, <HiOutlineChevronDown style={{ flexShrink: 0, color: '#005CFF', width: '18px', height: '18px', marginRight: "-10px"}} />]}
        triggerWhenOpen={[<div className='pr-[15px] font-semibold'>{heading}</div>, <HiOutlineChevronUp style={{ flexShrink: 0, color: '#005CFF', width: '18px', height: '18px', marginRight: "-10px" }} />]}
        triggerStyle={style}
        // onTriggerOpening = {lineMarginHandle}
        // onTriggerClosing = {lineMarginHandle}
      >
        {!isFormula? <div className='font-normal'>{content}</div> : <div>
          <div>It uses the following logic</div> <div className='font-semibold my-[10px]'>The fixed deposit calculator for simple interest FD– M = P + (P x r x t/100), <br/>where – P is the principal amount that you deposit.<br/> r is the rate of interest per annum.<br/> t is the tenure in years.</div>
        </div> }
      </Collapsible >

      {/* line */}

      {/* {isLast ? <div className='mb-1'></div> : <div style={isSidePanel? { width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginTop: '0.5rem', marginBottom: '0.5rem' } : isOpen? { width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginTop: '20px', marginBottom: '20px' }:{ width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginTop: '0px', marginBottom: '10px' }}></div>} */}
      {isLast ? <div className='mb-1'></div> : <div style={isSidePanel? { width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginTop: '0.5rem', marginBottom: '0.5rem' } :{ width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginTop: '10px', marginBottom: '10px', }}></div>}
      
    </>
  );
}