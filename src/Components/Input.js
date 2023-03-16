import { useState } from 'react';
import styles from '../styles/Input.module.scss'
export default function Input({ id, type = '', min = 0, max, step = 1, value, setValue }) {

    const [textValue, setTextValue] = useState(((type === 'rupees') ? '\u20B9' : '') + Number(value).toLocaleString("en-In") + ((type === 'percentage') ? '%' : ''));
    const [maxError, setMaxError]  = useState(false);


    const handleSliderValue = (event) => {
        let tempValue = event.target.value;
        setValue(Number(tempValue));
        setTextValue(((type === 'rupees') ? '\u20B9' : '') + Number(tempValue).toLocaleString("en-In") + ((type === 'percentage') ? '%' : ''));
    }


    const addSymbol = (event) => {
        setMaxError(false);
        let tempValue = event.target.value;
        if (!(String(textValue).charAt(0) == '\u20B9')) {
            tempValue = ((type === 'rupees') ? '\u20B9' : '') + Number(tempValue).toLocaleString("en-In");
        }
        if (!(String(textValue).charAt(-1) == '%')) {
            tempValue += ((type === 'percentage') ? '%' : '');
        }
        setTextValue(tempValue);
    }

    const removeSymbol = (event) => {
        setTextValue(event.target.value.replace(/,|\u20B9|%/g, ''));
    }




    const handleTextValue = (event) => {

        let tempValue = event.target.value;
        if (event.target.value > max) {
            setMaxError(true);
        }
        else {
            setMaxError(false);
        }
        if ((!(isNaN(tempValue)) && tempValue > 0 && tempValue <= max) || tempValue == '' || tempValue == '0') {

            if (tempValue == "") {
                tempValue = '0';
            }
            else if (tempValue.length == 2 && tempValue.charAt(0) == '0') {
                tempValue = tempValue.charAt(1);
            }
            setTextValue(tempValue);
            if (!(type==='rupees'||type==='percentage')) {
                setTextValue(Number(tempValue));    
            }
            else{
                setTextValue(tempValue);
            }
            setValue(Number(tempValue));
        }

    };
    return (
        
            <div className={styles.inputBox}>
            <div>
                <div>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        id={id}
                        onChange={handleSliderValue}
                        className={' accent-[#00D382] bg-transparent my-4 mr-[25px]'}
                    />
                </div>
                {(value < min) ? <div className=' text-[#FF7D7D] text-sm font-normal -mt-[8px] -mb-[12px]'>minimum value is {min.toLocaleString('en-In')}.</div> : (maxError) ? <div className=' text-[#FF7D7D] text-sm font-normal -mt-[8px] -mb-[12px]'>maximum value is {max.toLocaleString('en-In')}.</div> : ''}
            </div>
                
                
                <div>
                <input
                    type="text"
                    value={textValue}
                    id={`${id}Label`}
                    min={min}
                    max={max}
                    className={'w-[150px] [@media(min-width:360px)]:w-[100%] h-[40px] bg-[#D1E3FF] bg-opacity-[0.39] border-2 border-solid border-[#9BB0D3] rounded-[100px] text-center font-semibold text-[#1B1C20]'}
                    onBlur={(type === '') ? null : addSymbol}
                    onFocus={(type === '') ? null : removeSymbol}
                    onChange={handleTextValue}
                />
                </div>
                
        </div>        
    )
}