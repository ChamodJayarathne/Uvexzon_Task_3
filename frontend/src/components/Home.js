import React from "react";

const Home = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }
  return (
    <div>
      <h1>Welcome to Home Page</h1>
    </div>
  );
};

export default Home;
