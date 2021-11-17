import "./panelArticle.css";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notificationsPush } from "../../redux/actions/";

function PanelArticle({ object }) {
  const dispatch = useDispatch();
  const tempTags = JSON.parse(object.tagi).join(", ");
  const tags = tempTags.toString();
  const d = new Date(object.dataUtworzenia);
  let date = `${d.toLocaleString()}`;
  const [show, setShow] = useState(true);

  var isClicked = false;
  const deleteToAnimation = useRef(null);

  const deleteClicked = () => {
    if (isClicked) {
      deleteToAnimation.current.style.left = "100%";
      deleteToAnimation.current.style.width = "0%";
    } else {
      deleteToAnimation.current.style.left = "0%";
      deleteToAnimation.current.style.width = "100%";
    }
    isClicked = !isClicked;
  };

  const deleteArticle = async (e) => {
    e.stopPropagation();
    deleteToAnimation.current.style.left = "100%";
    deleteToAnimation.current.style.width = "0%";
    isClicked = false;
    const fetchData = await fetch(
      `http://localhost/blogg/api/deleteArticle.php?id=${object.id}`,
      { credentials: "include", method: "GET" }
    );
    const data = await fetchData.json();
    if (data.status === 1) {
      dispatch(notificationsPush({ x: data.info, color: "" }));
      setShow(false);
    } else {
      dispatch(notificationsPush({ x: data.info, color: "red" }));
    }
  };
  if (show === false) return null;

  return (
    <tr className="panelArticleTr ">
      <td className="panelArticleTitle">{object.tytul}</td>
      <td>{date}</td>
      <td
        style={{
          color:
            object.status === "1" || object.status === 1
              ? "var(--darkBlue)"
              : "rgb(204, 52, 52)",
        }}
      >
        {object.status === "1" || object.status === 1
          ? "publiczny"
          : "prywatny"}
      </td>
      <td>{tags}</td>
      <td>{object.kategoria}</td>
      <td>{object.wyswietlenia}</td>
      <td>{object.wyswietleniaDzis}</td>
      <td>{object.id}</td>

      <td>
        <Link to={`/articles/${object.id}`} className="panelLinkTd">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="var(--textOnBackground)"
          >
            <path
              id="Icon_awesome-arrow-alt-circle-right"
              data-name="Icon awesome-arrow-alt-circle-right"
              d="M10.563.563a10,10,0,1,1-10,10A10,10,0,0,1,10.563.563ZM5.885,12.337h4.677V15.2a.484.484,0,0,0,.827.343L16,10.905a.479.479,0,0,0,0-.681L11.389,5.587a.484.484,0,0,0-.827.343V8.788H5.885a.485.485,0,0,0-.484.484v2.581A.485.485,0,0,0,5.885,12.337Z"
              transform="translate(-0.563 -0.563)"
            />
          </svg>
        </Link>
      </td>

      <td>
        <Link to={`/panel/${object.id}`} className="panelLinkTd">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 33.182 33.182"
            stroke="var(--textOnBackground)"
          >
            <g
              id="Icon_feather-edit"
              data-name="Icon feather-edit"
              transform="translate(-1.5 -1.318)"
            >
              <path
                id="Path_1"
                data-name="Path 1"
                d="M16.5,6H6A3,3,0,0,0,3,9V30a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V19.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <path
                id="Path_2"
                data-name="Path 2"
                d="M27.75,3.75a3.182,3.182,0,0,1,4.5,4.5L18,22.5,12,24l1.5-6Z"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </g>
          </svg>
        </Link>
      </td>

      <td onClick={(e) => deleteClicked(e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15.556"
          height="20"
          viewBox="0 0 15.556 20"
          style={{ cursor: "pointer" }}
          fill="var(--textOnBackground)"
        >
          <path
            id="Icon_material-delete-forever"
            data-name="Icon material-delete-forever"
            d="M8.611,22.278A2.229,2.229,0,0,0,10.833,24.5h8.889a2.229,2.229,0,0,0,2.222-2.222V8.944H8.611Zm2.733-7.911L12.911,12.8l2.367,2.356L17.633,12.8,19.2,14.367l-2.356,2.356L19.2,19.078l-1.567,1.567-2.356-2.356-2.356,2.356-1.567-1.567,2.356-2.356Zm7.822-8.756L18.056,4.5H12.5L11.389,5.611H7.5V7.833H23.056V5.611Z"
            transform="translate(-7.5 -4.5)"
          />
        </svg>
        <div ref={deleteToAnimation} className="paneldeleteToAnimation">
          <div className="paneldeleteToAnimationBox">
            <div>usuń artykuł:</div>
            <div onClick={(e) => deleteArticle(e)}>ok</div>
            <div>cofnij</div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default PanelArticle;
