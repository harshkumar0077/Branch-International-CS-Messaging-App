import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SupportPreview from "./SupportPreview";
import Card from "./Card";
import axios from "axios";
import { getAllPendingRoutes, startChatRoute } from "./../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import NotificationSound from "../assets/notification.mp3";

export default function Welcome({ currentUser, socket }) {
  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    async function getAllRequests() {
      const res = await axios.get(getAllPendingRoutes);
      const allRequestsData = res.data.requests;
      if (allRequestsData === undefined) return;
      setAllRequests(allRequestsData);
    }
    if (currentUser) {
      getAllRequests();
    }
  }, []);

  useEffect(() => {
    if (socket.current) {
      const audio = new Audio(NotificationSound);
      socket.current.on("request-receive", (request) => {
        setAllRequests((prevRequests) => [...prevRequests, request]);
        try {
          audio.play();
        } catch (err) {}
      });

      socket.current.on("remove-request", (reqid) => {
        setAllRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== reqid)
        );
      });
    }
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const onRequestClick = async (request) => {
    const { data } = await axios.post(`${startChatRoute}/${request._id}`, {
      agent: currentUser._id,
    });
    if (data.status === true) {
      if (socket.current) {
        socket.current.emit("chat-accepted", request._id);
      }
    } else {
      toast.error("Could not start chat.", toastOptions);
    }
  };

  return (
    <Container style={{ backgroundColor: "#19355e" }}>
      <Card
        className="chat-card"
        title={"All Requests (" + allRequests.length + ")"}
      >
        {allRequests.map((request) => (
          <SupportPreview
            user={request.user.name}
            message={request.messages[0].message}
            time={new Date(request.createdAt).toLocaleString("en-IN")}
            key={request._id}
            handleClick={() => {
              onRequestClick(request);
            }}
          />
        ))}
      </Card>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  color: black;
  padding: 2rem;
  span {
    color: #4a0eff;
  }
`;
