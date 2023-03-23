export interface TableDetail {
  uid: string;
  lastChange: string | moment.Moment;
  status: string;
  comment: string;
  author: string;
  instanceId: string;
}
