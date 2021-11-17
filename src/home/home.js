import "./home.css";
import React, { useState, useEffect } from "react";
import Section from "./section/section";
import { Link } from "react-router-dom";
import { notificationsPush } from "../redux/actions/";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    async function fetchDownload() {
      try {
        const fetchData = await fetch("http://localhost/blogg/api/index.php", {
          credentials: "include",
          method: "GET",
        });
        const data = await fetchData.json();
        setSections(data);
      } catch (err) {
        if (notifications.length == 0)
          dispatch(
            notificationsPush({ x: "Błąd połączenia z serwerem", color: "red" })
          );
      }
    }
    fetchDownload();
  }, [dispatch, notifications]);

  return (
    <div className="homeWrapper">
      {sections.map((section) => (
        <Section key={section.id} articlesList={section} />
      ))}
      <Link to={"/articles"} className="homeMore">
        <div> WSZYSTKIE ARTYKUŁY {"->"} </div>
      </Link>
    </div>
  );
}

export default Home;
