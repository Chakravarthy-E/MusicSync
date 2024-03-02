import React, { useState } from "react";
import { useRouter } from "next/router";
import OtpField from "@/components/atoms/OtpField/OtpField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {}

const Verification = (props: Props) => {
  const router = useRouter();
  const userInfoString = router.query.userInfo as string | undefined;
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="my-3 text-center">Verify your mail</h2>
          </CardTitle>
          <p>
            An 6-digit code has been sent to{" "}
            <span className="font-bold">{userInfo?.email}</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-2 text-center">
          <OtpField numInputs={6} />
          <Button>Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verification;
