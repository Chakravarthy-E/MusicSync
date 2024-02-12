'use client'

import { forwardRef, InputHTMLAttributes, useRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onComplete?: (otp: string) => void;
}

const OTPField = forwardRef<HTMLInputElement, Props>(({ onComplete, ...rest }, ref) => {
  const inputRefs = useRef<HTMLInputElement[]>(new Array(4).fill(null) as HTMLInputElement[]);

  const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    const otp = inputRefs.current.map(input => input?.value || '').join('');
    if (otp.length === 4 && onComplete) {
      onComplete(otp);
    }
  };

  return (
    <div className="flex">
      {[...Array(4)].map((_, index) => (
        <input
          key={index}
          ref={el => {
            inputRefs.current[index] = el as HTMLInputElement;
            if (ref) {
              if (typeof ref === 'function') {
                ref(el);
              } else {
                ref.current = el as HTMLInputElement;
              }
            }
          }}
          type="text"
          maxLength={1}
          onChange={handleInputChange(index)}
          className="w-12 h-12 rounded-full font-Alegreya border-gray-300 text-xl text-center text-black font-semibold  focus:outline-none focus:border-blue-500 border-4 mr-2"
          {...rest}
        />
      ))}
    </div>
  );
});

export default OTPField;
