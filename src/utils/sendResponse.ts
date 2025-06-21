import { Response } from "express";

interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

const sendResponse = <T>(res: Response, payload: IApiResponse<T>) => {
  return res.status(200).json({
    ...payload,
    success: true,
  });
};

export { sendResponse };
export default sendResponse;
