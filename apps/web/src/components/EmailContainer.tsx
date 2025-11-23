"use client";

import { useEffect, useState } from "react";
import { TempEmailType } from "@repo/validation";
import { generateTempEmail, getTempEmail } from "@/lib/actions";
import TempEmail from "./TempEmail";
import Inbox from "./Inbox";

export default function EmailContainer({ id }: { id?: string }) {
  const [emailData, setEmailData] = useState<TempEmailType>();

  const generateTempEmailAction = async () => {
    setEmailData({
      id: "f61e8f1e-9773-4744-9645-2b6865294d2f",
      email: "sandrasmith376@corenewsbd.com",
      expiredAt: new Date("2025-11-23T14:50:44.018Z"),
    });
    // console.log("generating temp email");
    // const response = await generateTempEmail();
    // if (response && response.statusCode == 200) {
    //   setEmailData({
    //     ...response.data,
    //     expiredAt: new Date(response.data.expiredAt),
    //   });
    //   return response.data;
    // }
    // setTimeout(() => generateTempEmailAction(), 2000);
  };

  const getEmailInfo = async (id: string) => {
    const response = await getTempEmail(id);
    if (response && response.statusCode == 200) {
      setEmailData({
        ...response.data,
        expiredAt: new Date(response.data.expiredAt),
      });
      return response.data;
    }
  };

  useEffect(() => {
    if (id) {
      getEmailInfo(id);
    } else {
      generateTempEmailAction();
    }
  }, []);

  return (
    <>
      <TempEmail
        emailData={emailData}
        generateNewEmail={generateTempEmailAction}
      />
      <Inbox emailData={emailData} />
    </>
  );
}
