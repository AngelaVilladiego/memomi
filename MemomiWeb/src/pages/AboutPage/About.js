import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const About = () => {
  return <p>About</p>;
};



const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
