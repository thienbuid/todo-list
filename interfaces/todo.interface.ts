export enum STATUS_TODO {
  "TODO",
  "INPROGRESS",
  "COMPLETED",
}

export const KEY_DROPABLE_ID = {
  compeleted: "COMPELETED",
  todo: "TODO",
  inprogress: "INPROGRESS",
};

export default interface ToDo {
  id: string;
  content: string;
  status: STATUS_TODO;
  createDate: string;
}
