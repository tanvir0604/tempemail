export type EmailContentType = {
  id: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  messageId: string;
  references: string;
  uid: number;
  createdAt: Date;
};
