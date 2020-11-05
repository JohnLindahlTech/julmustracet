import { randomBytes } from "crypto";
import { Model } from "./model";

export const DEFAULT_ROLES = ["user"];

export type IUser = {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  email?: string;
  name?: string; // couchdb identifier, use email here.
  emailVerified?: boolean | string | Date;
  image?: string;

  username?: string;

  // CouchDB
  roles?: string[];
  password?: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;
  type?: "user";
};

export class User implements Model {
  _id: string;
  id: string;
  _rev?: string;
  _deleted: boolean;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  username: string;
  roles: string[];
  password: string;
  createdAt: Date;
  updatedAt: Date;
  type: "user";

  static buildId(name: string): string {
    if (/^org.couchdb.user:/.test(name)) {
      return name;
    }
    return `org.couchdb.user:${name}`;
  }

  constructor({
    _rev,
    _deleted,
    email,
    name = email,
    emailVerified,
    username,
    image,
    roles = DEFAULT_ROLES,
    password = randomBytes(32).toString("hex"),
    createdAt = new Date(),
    updatedAt = new Date(),
    _id = User.buildId(name),
  }: IUser) {
    this.type = "user";
    this._id = _id;
    this.id = _id;
    this._rev = _rev;
    this._deleted = _deleted;
    if (name) {
      this.name = name;
    }
    if (email) {
      this.email = email;
    }
    if (image) {
      this.image = image;
    }
    if (emailVerified === true) {
      const currentDate = new Date();
      this.emailVerified = currentDate;
    } else if (emailVerified) {
      this.emailVerified = new Date(emailVerified);
    }
    this.roles = roles;
    this.changeUsername(username);
    this.password = password;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  delete(): void {
    this._deleted = true;
  }

  changeUsername(username: string): void {
    this.roles = [
      username,
      ...this.roles.filter((r) => r !== this.username),
    ].filter(Boolean);
    this.username = username;
  }

  toDoc(updated: boolean): IUser {
    const doc = {
      type: this.type,
      _id: this._id,
      name: this.name,
      email: this.email,
      image: this.image,
      roles: this.roles,
      username: this.username,
      password: this.password,
      createdAt: this.createdAt.toJSON(),
      updatedAt: updated ? new Date().toJSON() : this.updatedAt.toJSON(),
    } as IUser;
    if (this.emailVerified) {
      doc.emailVerified = this.emailVerified.toJSON();
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
