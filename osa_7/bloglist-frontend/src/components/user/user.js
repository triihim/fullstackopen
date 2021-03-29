import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  if(!user) return <p>User not found</p>;
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      {user.blogs.map(b => {
        return (
          <div key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default User;