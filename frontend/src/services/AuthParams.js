export default function authParams() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.accessToken) {
    return {};
  }

  return { ...user };
}
