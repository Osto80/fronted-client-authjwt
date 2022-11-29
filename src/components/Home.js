import React, { useState, useEffect } from "react";
import "./home.css";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import PostService from "../services/post.service";

// Ska bli All Posts

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    PostService.getAll().then(
      (res) => {
        setContent(res.data);
        console.log(res.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  const renderUserButtons = (userId) => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser.id === userId) {
      return (
        <div className="btn-container">
          <div>
            <a>Remove</a>
          </div>
          <div>
            <a>Edit</a>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <div>
          <ul>
            {Object.values(content).map((post) => (
              <div className="post-container">
                <div className="post">
                  <li key={post.id}>{post.userId}</li>
                  <li key={post.id}>{post.title}</li>
                  <li key={post.id}>{post.content}</li>
                </div>
                {renderUserButtons(post.userId)}
              </div>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Home;
