import axios from "axios";
import { Mails } from "../entities";

const mailsController = "/Mails";
export const getMailsAPI = async () => {
  const { data } = await axios.get<Mails[]>(`${mailsController}/GetAllMails`);
  return data;
};

export const saveMailAPI = async (mail: Mails) => {
  const { data } = await axios.post<Mails>(`${mailsController}/SaveMail`, mail);
  return data;
};

export const deleteMailAPI = async (mailId: number) => {
  const { data } = await axios.delete<number>(`${mailsController}/DeleteMail`, {
    params: { mailId },
  });
  return data;
};