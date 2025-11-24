"use client";

import { useEffect, useState } from "react";
import { TempEmailType } from "@repo/validation";
import { generateTempEmail, getTempEmail } from "@/lib/actions";
import TempEmail from "./TempEmail";
import Inbox from "./Inbox";

export default function EmailContainer({ id }: { id?: string }) {
  const [emailData, setEmailData] = useState<TempEmailType>();

  const generateTempEmailAction = async () => {
    const getEmail = localStorage.getItem("temp_email");
    if (getEmail) {
      console.log("getting temp email from localstorage");
      const getEmailData = JSON.parse(getEmail);
      if (id) {
        if (getEmailData.id && id === getEmailData.id) {
          setEmailData({
            ...getEmailData,
            expiredAt: new Date(getEmailData.expiredAt),
          });
          return;
        }
      } else {
        setEmailData({
          ...getEmailData,
          expiredAt: new Date(getEmailData.expiredAt),
        });
        return;
      }
    }

    console.log("generating temp email");
    const response = await generateTempEmail();
    if (response && response.statusCode == 200) {
      setEmailData({
        ...response.data,
        expiredAt: new Date(response.data.expiredAt),
      });
      localStorage.setItem("temp_email", JSON.stringify(response.data));
      return response.data;
    }
    setTimeout(() => generateTempEmailAction(), 2000);
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
