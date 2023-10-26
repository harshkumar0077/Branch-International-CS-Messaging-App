import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import LoginImage from "../assets/loginImage1.png";
import BranchLogo from "../assets/branchLogo.png";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("support-chat-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { password, name, email } = values;
      const { data } = await axios.post(registerRoute, {
        name,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        localStorage.setItem("support-chat-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (name.length < 3) {
      toast.error("Name should contain atleast 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should contain atleast 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div style={{ backgroundColor: "#4fcdff" }}>
        <img
          alt="logo"
          src={BranchLogo}
          style={{ height: "2.8rem", margin: "16px 90px" }}
        />
        <div
          style={{
            backgroundColor: "#4fcdff",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="brand">
                <h1>Support Chat</h1>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => handleChange(e)}
              />
              <button type="submit">Register</button>
              <span>
                Already have an account?
                <Link to="/login"> Login</Link>
              </span>
            </form>
          </FormContainer>

          <ToastContainer />
          <img
            style={{ width: "50vw", height: "65vh" }}
            alt="img"
            src={LoginImage}
          />
        </div>
      </div>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  ${"" /* justify-content: center; */}
  gap: 1rem;
  ${"" /* align-items: center; */}
  ${"" /* background-color: #f1f1f5; */}

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    ${"" /* background-color: #000000d7; */}
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #2a0e75;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #4400ff;
        outline: none;
      }
    }
    button {
      background-color: #000000;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: none;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #000000cc;
      }
    }
    span {
      color: black;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        ${"" /* font-weight: bold; */}
      }
    }
  }
`;

export default Register;
