export interface IUser {
  _id: string;
  chatId: string;
  name: string;
  isPaid: "paid" | "not_paid" | "wait" | "deny_paid";
  joinDate: string | null;
  status: "active" | "inactive" | "block";
  action: string;
  createdAt: Date;
}
