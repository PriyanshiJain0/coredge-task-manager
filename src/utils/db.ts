// db.ts
import Dexie, { Table } from "dexie";
import { Task, User } from "./interfaces";

interface UserDb extends User {
  id?: string;
}

class UserDatabase extends Dexie {
  // 'User' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<UserDb>;
  // tasks!: Table<Task>;

  constructor() {
    super("usersDatabase");
    this.version(1).stores({
      users: "++id, username, email, password",
      // tasks: "++id, title description dueDate createdAt ceatedBy", // Primary key and indexed props
    });
    this.open();
  }
}

const _userDb = new UserDatabase();
export const userDb = _userDb.users;
// export const tasksDb = _userDb.tasks;
