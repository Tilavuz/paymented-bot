export interface IPayment {
  _id: string;
  chatId: string;
  amount: number;
  screenshotUrl: string;
  isApproved: boolean;
  seen: boolean;
  createdAt: Date;
}
