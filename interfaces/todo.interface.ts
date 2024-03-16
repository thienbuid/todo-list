export enum STATUS_TODO {
  "TODO",
  "INPROGRESS",
  "COMPLETED",
}

export default interface ToDo {
  id: string;
  content: string;
  status: STATUS_TODO;
  createDate: string;
}
