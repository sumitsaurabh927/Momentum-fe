import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quote.css";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;
      document.getElementById("time").textContent = time;
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const quoteButtonHandler = () => {
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="quote">{quote.text}</div>
      <div className="author">- {quote.author || "Unknown"}</div>
      <div id="time" className="time" style={{ fontSize: "3rem" }}></div>
      <button className="qote_button" onClick={quoteButtonHandler}>
        See Todo's
      </button>
    </div>
  );
};

export default Quote;
