/**
 * Decode JWT token payload without verification
 * (verification happens on backend - we just read the data)
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null;

    // Split the token and get the payload part (second part)
    const base64Url = token.split(".")[1];

    // Convert base64url to base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  // exp is in seconds, Date.now() is in milliseconds
  return decoded.exp * 1000 < Date.now();
};
