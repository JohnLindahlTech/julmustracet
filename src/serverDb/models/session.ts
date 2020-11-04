import { randomBytes } from "crypto";
import { Model } from "./model";

export type ISession = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  userId: string;
  expires: string | Date;
  sessionToken?: string; // Secret AF
  accessToken?: string; // Clientside consumable
  createdAt?: string | Date;
  updatedAt?: string | Date;
  type?: "session";
};

export class Session implements Model {
  _id: string;
  _rev: string;
  _deleted: boolean;
  userId: string;
  expires: Date;
  sessionToken: string; // Secret AF
  accessToken: string; // Clientside consumable
  createdAt: Date;
  updatedAt: Date;
  type: "session";

  static buildId(sessionToken: string): string {
    if (/^session:/.test(sessionToken)) {
      return sessionToken;
    }
    return `session:${sessionToken}`;
  }

  constructor({
    _rev,
    userId,
    expires,
    sessionToken = randomBytes(32).toString("hex"),
    accessToken = randomBytes(32).toString("hex"),
    createdAt = new Date(),
    updatedAt = new Date(),
    _id = Session.buildId(sessionToken),
  }: ISession) {
    this.type = "session";
    this._id = _id;
    this._rev = _rev;
    this.userId = userId;
    if (expires) {
      this.expires = new Date(expires);
    }
    this.sessionToken = sessionToken;
    this.accessToken = accessToken;
    this.updatedAt = new Date(updatedAt);
    this.createdAt = new Date(createdAt);
  }

  delete(): void {
    this._deleted = true;
  }

  toDoc(): ISession {
    const doc = {
      type: this.type,
      _id: this._id,
      userId: this.userId,
      expires: this.expires.toJSON(),
      sessionToken: this.sessionToken,
      accessToken: this.accessToken,
      updatedAt: this.updatedAt.toJSON(),
      createdAt: this.createdAt.toJSON(),
    } as ISession;

    if (this._rev) {
      doc._rev = this._rev;
    }
    if (this._deleted) {
      doc._deleted = this._deleted;
    }
    return doc;
  }
}
