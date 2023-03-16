import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";


export default function CollapsibleBox({ heading, content = "", isFormula = false, isLast = false , isSidePanel = false}) {

  let weight = 400;
  if (!isSidePanel) {
    weight = 600;
  }

  const style = {
    cursor: 'pointer',
    fontWeight: weight,
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.5rem 0.5rem 10px 0',
  }

  return (
    <>

    <Collapsible
        trigger={[<div className='pr-[15px]'>{heading}</div>, <HiOutlineChevronDown style={{ flexShrink: 0, color: '#005CFF', width: '18px', height: '18px', marginRight: "-10px"}} />]}
        triggerWhenOpen={[<div className='pr-[15px]'>{heading}</div>, <HiOutlineChevronUp style={{ flexShrink: 0, color: '#005CFF', width: '18px', height: '18px', marginRight: "-10px" }} />]}
        triggerStyle={style}

      >
        {!isFormula? <div className='font-normal mb-[20px]'>{content}</div> : 
        <div className='mb-[20px]'>
          <div>It uses the following logic</div> <div className='font-semibold my-[10px]'>A = (MI * ((1+r/400)^quarters - 1))/(1 - (1+r/400)^(-1/3))<br/> Where, <br/> A 	= Total amount by the end of the period <br/> MI 	= Monthly recurring deposit amount <br/> r 	= Annual rate of interest <br/> quarters = number of quarters in the mentioned period <br/> </div>
        </div> }
      </Collapsible >

      {/* line */}
      {isLast ? <div className='mb-1'></div> : <div style={isSidePanel? { width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginBottom: '10px' } :{ width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginBottom: '10px', }}></div>}
      
      
    </>
  );
}