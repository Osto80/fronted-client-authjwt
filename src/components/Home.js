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

  const deletePost = (userId, postId) => {
    PostService.remove(userId, postId);
  }

  const renderUserButtons = (userId, postId) => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser.id === userId) {
      return (
        <div className="btn-container">
          <div>
            <button onClick={() => deletePost(userId, postId)}>Remove</button>
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
              <div key={post.id} className="post-container">
                <div className="post">
                  <li>User-ID: {post.userId}</li>
                  <li>Post ID: {post.id}</li>
                  <li>{post.title}</li>
                  <li>{post.content}</li>
                </div>
                {renderUserButtons(post.userId, post.id)}
              </div>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Home;
