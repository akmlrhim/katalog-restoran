/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import { openDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: "id",
    });
  },
});

const FAVORITE_IDB = {
  async getData(id) {
    if (!id) {
      return;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async getAllData() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async putData(restaurant) {
    if (!restaurant.hasOwnProperty("id")) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },

  async deleteData(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FAVORITE_IDB;
