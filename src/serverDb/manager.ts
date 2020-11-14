import PouchDB from "pouchdb";
import * as Sentry from "@sentry/node";
import { Model, ModelConstructor, User } from "./models";

export default class Manager {
  userDb: PouchDB.Database;
  authDb: PouchDB.Database;
  constructor(userDb: PouchDB.Database, authDb: PouchDB.Database) {
    this.userDb = userDb;
    this.authDb = authDb;
  }

  private async _save(document: Model, db: PouchDB.Database) {
    let toSave = document.toDoc(true);
    try {
      const saved = await db.get(document._id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toSave = {
        ...saved,
        ...(document.toDoc(true) as Record<string, unknown>),
      };
    } catch (error) {
      if (error.name !== "not_found") {
        throw error;
      }
    }

    try {
      const res = await db.put(toSave);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async saveDoc(model: Model): Promise<PouchDB.Core.Response> {
    if (model.type === "user") {
      return this._save(model, this.userDb);
    } else {
      return this._save(model, this.authDb);
    }
  }

  async _delete(
    id: string,
    db: PouchDB.Database
  ): Promise<PouchDB.Core.Response> {
    const raw = (await db.get(id)) as Model;
    if (raw) {
      raw._deleted = true;
      raw.updatedAt = new Date().toJSON();
      return db.put(raw);
    }
    return null;
  }

  async deleteById(
    model: ModelConstructor,
    id: string
  ): Promise<PouchDB.Core.Response> {
    if (model instanceof User) {
      return this._delete(id, this.userDb);
    } else {
      return this._delete(id, this.authDb);
    }
  }

  async deleteDoc(doc: Model): Promise<PouchDB.Core.Response> {
    doc.delete();
    if (doc.type === "user") {
      return this._save(doc, this.userDb);
    } else {
      return this._save(doc, this.authDb);
    }
  }
}
