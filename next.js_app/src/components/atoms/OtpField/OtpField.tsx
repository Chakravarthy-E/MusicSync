import React, { useState } from "react";

interface OtpFieldProps {
  numInputs: number;
}

const OtpField: React.FC<OtpFieldProps> = ({ numInputs }) => {
  const [otp, setOtp] = useState<string[]>(Array(numInputs).fill(""));

  const handleChange = (index: number, value: string) => {
    if (!isNaN(Number(value)) && value !== "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < numInputs - 1 && value !== "") {
        const nextInput = document.getElementById(`input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyUp = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      // Check if the current input field is empty
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);

        // Move focus to the previous input
        const prevInput = document.getElementById(`input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("text");
    if (clipboardData.length === numInputs && /^[0-9]+$/.test(clipboardData)) {
      setOtp(clipboardData.split(""));
    }
  };

  return (
    <div>
      {Array.from({ length: numInputs }, (_, index) => (
        <input
          key={index}
          id={`input-${index}`}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyUp={(e) => handleKeyUp(index, e)}
          onPaste={(e) => handlePaste(e)}
          className="m-2 w-10 rounded-lg border px-2 py-2 text-center"
        />
      ))}
    </div>
  );
};

export default OtpField;
