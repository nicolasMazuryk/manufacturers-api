export const modelToPlain = e => e.get({ plain: true });

export function dumpUser(user) {
  return {
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,

    // status: user.status,
    role: user.role,
  };
}

export function listUser(user) {
  return {
    id: user.id,
    email: user.email,
    // status: user.status,
    role: user.role,
  };
}
