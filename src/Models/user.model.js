export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.email = name;
    this.email = email;
    this.password = password;
  }
  static get() {
    return users;
  }

  static add(name, email, password) {
    const newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
  }
}

const users = [];
