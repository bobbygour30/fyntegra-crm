const KEY = "users";

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem(KEY, JSON.stringify(users));
};

export const addUser = (user) => {
  const users = getUsers();
  saveUsers([...users, user]);
};

export const deleteUsersByIds = (ids) => {
  const users = getUsers().filter((u) => !ids.includes(u.id));
  saveUsers(users);
  return users;
};
