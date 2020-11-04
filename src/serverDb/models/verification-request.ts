import { Model } from "./model";

export type IVerificationRequest = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  identifier?: string; // email, phone, username or anything
  token?: string; // Verifying token
  uniqueMessage?: string;
  expires?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  type?: "verification-request";
};

export class VerificationRequest implements Model {
  _id: string;
  _rev: string;
  _deleted: boolean;
  identifier: string; // email, phone, username or anything
  token: string; // Verifying token
  uniqueMessage: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
  type: "verification-request";

  static buildId(token: string): string {
    if (/^verification-request:/.test(token)) {
      return token;
    }
    return `verification-request:${token}`;
  }

  constructor({
    _rev,
    _deleted,
    identifier,
    token,
    uniqueMessage,
    expires,
    createdAt = new Date(),
    updatedAt = new Date(),
    _id = VerificationRequest.buildId(token),
  }: IVerificationRequest) {
    this.type = "verification-request";
    this._id = _id;
    this._rev = _rev;
    this._deleted = _deleted;
    if (identifier) {
      this.identifier = identifier;
    }
    if (token) {
      this.token = token;
    }
    this.uniqueMessage = uniqueMessage;
    if (expires) {
      this.expires = new Date(expires);
    }
    this.updatedAt = new Date(updatedAt);
    this.createdAt = new Date(createdAt);
  }

  delete(): void {
    this._deleted = true;
  }

  toDoc(): IVerificationRequest {
    const doc = {
      _id: this._id,
      identifier: this.identifier,
      token: this.token,
      uniqueMessage: this.uniqueMessage,
      updatedAt: this.updatedAt.toJSON(),
      createdAt: this.createdAt.toJSON(),
    } as IVerificationRequest;
    if (this.expires) {
      doc.expires = this.expires.toJSON();
    }
    if (this._rev) {
      doc._rev = this._rev;
    }
    if (this._deleted) {
      doc._deleted = this._deleted;
    }
    return doc;
  }
}
