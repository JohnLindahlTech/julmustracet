export interface ModelConstructor {
  new (props: unknown): Model;
  buildId: (...args: unknown[]) => string;
}

export interface Model {
  type: string;
  _id: string;
  _rev?: string;
  _deleted?: boolean;
  updatedAt: string | Date;
  createdAt: string | Date;

  delete: () => void;
  toDoc: (updated: boolean) => unknown;
}
