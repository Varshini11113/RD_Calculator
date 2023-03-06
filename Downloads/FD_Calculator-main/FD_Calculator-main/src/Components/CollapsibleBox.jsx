import React from 'react';
import Collapsible from 'react-collapsible';
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";


export default function CollapsibleBox({ heading, headingBold = false, content, isLast = false , isSidePanel = false}) {
  let weight = 400;
  if (headingBold) {
    weight = 600;
  }
  const style = {
    cursor: 'pointer',
    fontWeight: weight,
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.5rem 0.5rem 0.5rem 0',
  }
  return (
    <>
      <Collapsible
        trigger={[heading, <HiOutlineChevronDown style={{ flexShrink: 0, color: '#005CFF', width: '18px', height: '18px' }} />]}
        triggerWhenOpen={[heading, <HiOutlineChevronUp style={{ flexShrink: 0, color: '#005CFF', width: '18px', height: '18px' }} />]}
        triggerStyle={style}
      >
        <div className={isSidePanel? "text-sm" : ""}>{content}</div>
      </Collapsible >

      {/* line */}

      {isLast ? <div className='mb-1'></div> : <div style={isSidePanel? { width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginTop: '0.5rem', marginBottom: '0.5rem' } : { width: 100 + '%', height: '0px', border: '0.5px solid #C4C4C4', opacity: 0.6, marginTop: '1rem', marginBottom: '1rem' }}></div>}

    </>
  );
}