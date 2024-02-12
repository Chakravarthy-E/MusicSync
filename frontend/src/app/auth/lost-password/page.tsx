import { Button } from "@/components/atoms/Button/Button";
import { TextField } from "@/components/atoms/TextField/TextField";

export default function LostPasword() {
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className=" flex flex-col items-center space-y-3 border rounded-md px-10 py-10 w-96">
        <h1 className=" text-xl font-Montserrat">Enter your email</h1>
        <TextField name="email" value={""} type="email" />
        <Button buttonText={"Submit"} variant="icon" />
      </div>
    </div>
  );
}
