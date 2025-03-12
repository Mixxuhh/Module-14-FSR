import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string | null> => {
  // TODO: make a POST request to the login route
  try {
    const responce = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await responce.json();

    if (!responce.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export { login };
