export function getUsers(req, res, next) {
  const { id, username } = req.username;
  res.status(200).json({ id, username });
}
