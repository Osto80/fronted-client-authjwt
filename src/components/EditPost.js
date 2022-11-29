import React, { useState, useRef } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useNavigate } from "react-router-dom";

import PostService from "../services/post.service";
import AuthService from "../services/auth.service";

// Ska bli Create New Post
// Input form och knappar ska renderas, koppla till backend på rätt sätt
const NewPost = () => {
  const navigate = useNavigate();
  
  const form = useRef();
  const checkButton = useRef();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const validContent = (value) => {
    if (value.length < 1 || value.length > 100) {
      return (
        <div className="alert alert-danger" role="alert">
          The contents text must be between 1 and 100 characters.
        </div>
      );
    }
  };

  const onChangeContent = (event) => {
    const content = event.target.value;
    setContent(content);
  };
  
  // Uppdateras för endast Content
  const handleNewPost = (event) => {
    event.preventDefault();

    setMessage("");
    setSuccessful(false);
    
    form.current.validateAll();

    const currentUser = AuthService.getCurrentUser();

    const newPost = {
      title: title,
      content: content,
      user: currentUser.id
    }

    if (checkButton.current.context._errors.length === 0) {
      PostService.create(newPost).then((res) => {
        setMessage(res.data.message);
        setSuccessful(true);
        navigate("/home");
        window.location.reload();

      }, (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      })
    }

    

  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleEditPost} ref={form}>
          {!successful && (
            <div>
              <div>
                TITLE PLACEHOLDER IMPORT
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <Input
                  type="text"
                  className="form-control"
                  name="content"
                  value={content}
                  onChange={onChangeContent}
                  validations={[required, validContent]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Publish post</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert" >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkButton} />
        </Form>
      </div>
    </div>
  );
};

export default EditPost;