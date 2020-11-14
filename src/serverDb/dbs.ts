import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

const couchdbUrl = process.env.COUCHDB_ADMIN_URL;

export const userDb = new PouchDB(`${couchdbUrl}/_users`, { skip_setup: true });
export const authDb = new PouchDB(`${couchdbUrl}/auth`, { skip_setup: true });
export const julmustracetDb = new PouchDB(`${couchdbUrl}/julmustracet`, {
  skip_setup: true,
});
