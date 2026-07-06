const DEMO_USER = {
  id: "demo-sandy",
  userId: "sandy",
  password: "800390",
  name: "Sandy"
};

export async function login(userId, password) {
  await new Promise(resolve => setTimeout(resolve, 400));

  const normalizedUserId = String(userId || "").trim().toLowerCase();
  const normalizedPassword = String(password || "").trim();

  if (normalizedUserId === DEMO_USER.userId && normalizedPassword === DEMO_USER.password) {
    return {
      success: true,
      user: {
        id: DEMO_USER.id,
        name: DEMO_USER.name,
        userId: DEMO_USER.userId
      }
    };
  }

  return {
    success: false,
    message: "Invalid User ID or password."
  };
}

export function isKnownUser(session) {
  return session?.id === DEMO_USER.id && session?.userId === DEMO_USER.userId;
}
