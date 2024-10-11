export const unauthorizedRedirect = (isLoggedIn, setIsLoggedIn, navigate) => {
  const localKey = "sb-rotyixpntplxytekbeuz-auth-token";

  if (!isLoggedIn) {
    if (localStorage.getItem(localKey)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }
};
