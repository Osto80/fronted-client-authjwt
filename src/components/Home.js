import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

import AuthService from "../services/auth.service";
import PostService from "../services/post.service";

const Home = () => {
  const [content, setContent] = useState("");
  let navigate = useNavigate();

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

  const deletePost = (postId) => {
    PostService.remove(postId).then(() => {
      window.location.reload();
    })
  };

  const renderUserButtons = (userId, postId) => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser.id === userId) {
      return (
        <div className="btn-container">
          <div>
            <button onClick={() => deletePost(postId)}>Remove</button>
          </div>
          <div>
            <button
              onClick={() => navigate("/editpost", { state: { id: postId } })}
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Current posts:</h1>
        <div className="posts-container">
          <ul className="posts-list">
            {Object.values(content).map((post) => (
              <div key={post.id} className="post-wrapper">
                <div className="post">
                  <li>
                    <strong>User-ID:</strong> {post.userId}
                  </li>
                  <li>
                    <strong>Post ID:</strong> {post.id}
                  </li>
                  <li>
                    <strong>Title:</strong> {post.title}
                  </li>
                  <li>
                    <strong>Content:</strong> {post.content}
                  </li>
                  {renderUserButtons(post.userId, post.id)}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Home;
