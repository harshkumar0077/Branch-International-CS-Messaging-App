import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import BranchLogo from "../assets/branchLogo.png";
import LoginImage from "../assets/loginImage1.png";
// import ".../py"

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("support-chat-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { password, email } = values;
      const { data } = await axios.post(loginRoute, {
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
    if (password === "") {
      toast.error("Email and password required", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email and password required", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div
      style={{
        backgroundColor: "#4fcdff",
        paddingTop: "70px",
      }}
    >
      {/* <img
        alt="logo"
        src={BranchLogo}
        style={{ height: "2.8rem", margin: "16px 90px" }}
      /> */}
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <FormContainer>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <h1>Support Chat</h1>
            </div>
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
            <button type="submit">Login</button>
            <span>
              <div st>
                Don't have an account?
                <Link to="/register"> Register</Link>
              </div>
            </span>
          </form>
        </FormContainer>
        <img
          style={{ width: "50vw", height: "65vh" }}
          alt="img"
          src={LoginImage}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

const FormContainer = styled.div`
  height: 90vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  ${"" /* justify-content: center; */}
  gap: 1rem;
  ${"" /* align-items: center; */}
  background-color: transparent;

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
    gap: 2rem;
    ${"" /* background-color: #000000d7; */}
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid black;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #black;
        outline: none;
      }
    }
    button {
      background-color: black;
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

export default Login;
