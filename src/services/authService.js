const DEMO_USER = {
  userId: "sandy",
  password: "800390"
};

export async function login(userId, password) {
  await new Promise(resolve => setTimeout(resolve, 400));

  if (userId === DEMO_USER.userId && password === DEMO_USER.password) {
    return {
      success: true,
      user: {
        id: 1,
        name: "Sandy",
        userId
      }
    };
  }

  return {
    success: false,
    message: "Invalid User ID or password."
  };
}
