import styles from '@/styles/Input.module.css'
export default function Input({ id, type = '', min = 0, max, step = 1, value, setValue }) {

    const handleValue = (event) => {

        if (event.target.value.charAt(0) == '\u20B9') {
            event.target.value = event.target.value.slice(1);
        }
        if (event.target.value.charAt(-1) == '%') {
            event.target.value = event.target.value.slice(0,-1);
        }
        event.target.value = Number(event.target.value.replace(/,/g, ''));
        
        if (!(isNaN(event.target.value)) && event.target.value > 0 && event.target.value <= max) {
            if (event.target.value == "") {
                setValue(0);
            }
            else if (event.target.value.length == 2 && event.target.value.charAt(0) == '0') {
                setValue(Number(event.target.value.charAt(1)));
            }
            else {
                setValue(Number(event.target.value));
            }
        }

    };

    return (
        <div className={styles.inputBox}>
                <div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    id={id}
                    onChange={handleValue}
                    className={' accent-[#00D382] bg-transparent my-4 '}
                />
                </div>
                
                <div>
                <input
                    type="text"
                    value={((type === 'rupees') ? '\u20B9' : '') + value.toLocaleString("en-In") + ((type === 'percentage') ? '%' : '')}
                    id={`${id}Label`}
                    min={min}
                    max={max}
                    className={'w-[150px] h-[40px] bg-[#D1E3FF] bg-opacity-[0.39] border-2 border-solid border-[#9BB0D3] rounded-[100px] text-center font-semibold '}
                    onChange={handleValue}
                />
                </div>
                
        </div>
    )
}