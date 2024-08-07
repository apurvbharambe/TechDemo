
export const isAuthenticated = () => {
    // Check if the code is running in the browser
    if (typeof window !== 'undefined') {
      // Check if the token exists and is valid
      const token = localStorage.getItem('token');
      return !!token; // Returns true if token exists
    }
    return false; // Return false if not in the browser
  };
  
  export const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      // Optionally, you could redirect to login or homepage
    }
  };