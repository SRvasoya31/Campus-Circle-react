const API_URL = "http://localhost:5000/api"; // Ensure this matches your backend URL

// Sign Up function
export const signUp = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    // Ensure response is valid JSON
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Sign up failed" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Sign Up Error:", error);
    return { success: false, message: "Failed to connect to server" };
  }
};

// Sign In function
export const signIn = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Sign in failed" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Sign In Error:", error);
    return { success: false, message: "Failed to connect to server" };
  }
};

export const addPG = async (pgData) => {
  const response = await fetch(`${BASE_URL}/pg/add`, {
    method: "POST",
    body: pgData,
  });

  return response.json();
};
