import { Button } from "@/components/atoms/Button/Button";
import OTPField from "@/components/atoms/OTPField/OTPField";

export default function Verification() {
  return (
    <div className=" min-h-screen flex items-center justify-center flex-col space-y-9">
      <div className=" flex items-center justify-center flex-col space-y-9 border px-10 py-10 h-96 w-96 rounded-md">
        <h1 className=" text-xl font-Montserrat text-center font-semibold">
          Verify your email by entering OTP
        </h1>
        <OTPField />
        <Button variant="icon" buttonText="Submit" />
      </div>
    </div>
  );
}
