import "./scss/Home.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SignIn from "./components/forms/SignIn";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function Home() {
  const storedJwt = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  const [showSignInForm, setShowSignInForm] = useState(false);

  // Find a way to keep user logged in if a token exists
  useEffect(() => {
    if (storedJwt) {
      axios.get("/users/").then((results) => {
        setUser(results.data.authData);
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="Home">
      <header>
        <h1>Members Only</h1>
      </header>
      <main>
        <aside className="sideBar">
          {user ? null : (
            <button onClick={() => setShowSignInForm(true)}>Sign In</button>
          )}
          {user ? (
            <button onClick={() => handleSignOut()}>Sign Out</button>
          ) : null}
        </aside>

        <aside className="mainContent">
          <div>{user ? <h1>Hello {user.username}</h1> : null}</div>
          <div className="messageContainer"></div>
        </aside>
      </main>
      {/* Form Components */}
      {showSignInForm ? (
        <SignIn setShowSignInForm={setShowSignInForm} setUser={setUser} />
      ) : null}
    </div>
  );
}

export default Home;
