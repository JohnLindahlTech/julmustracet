import { createHash } from "crypto";
import { Model } from "./model";

export type IAccount = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  compoundId?: string;
  userId: string;
  providerType: string;
  providerId: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  type?: "account";
};

export class Account implements Model {
  _id: string;
  _rev: string;
  _deleted: boolean;
  compoundId: string;
  userId: string;
  providerType: string;
  providerId: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: Date;
  createdAt: Date;
  updatedAt: Date;
  type: "account";

  static buildId(providerId: string, providerAccountId: string): string {
    return `account:${providerId}:${providerAccountId}`;
  }

  constructor({
    _rev,
    userId,
    providerId,
    providerType,
    providerAccountId,
    compoundId = createHash("sha256")
      .update(`${providerId}:${providerAccountId}`)
      .digest("hex"),
    refreshToken,
    accessToken,
    accessTokenExpires,
    createdAt = new Date(),
    updatedAt = new Date(),
    _id = Account.buildId(providerId, providerAccountId),
  }: IAccount) {
    this.type = "account";
    this._id = _id;
    this._rev = _rev;
    this.compoundId = compoundId;
    this.userId = userId;
    this.providerType = providerType;
    this.providerId = providerId;
    this.providerAccountId = providerAccountId;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    if (accessTokenExpires) {
      this.accessTokenExpires = new Date(accessTokenExpires);
    }
    this.updatedAt = new Date(updatedAt);
    this.createdAt = new Date(createdAt);
  }

  delete(): void {
    this._deleted = true;
  }

  toDoc(): IAccount {
    const doc = {
      type: this.type,
      _id: this._id,
      compoundId: this.compoundId,
      userId: this.userId,
      providerType: this.providerType,
      providerId: this.providerId,
      providerAccountId: this.providerAccountId,
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      updatedAt: this.updatedAt.toJSON(),
      createdAt: this.createdAt.toJSON(),
    } as IAccount;

    if (this.accessTokenExpires) {
      doc.accessTokenExpires = this.accessTokenExpires.toJSON();
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
