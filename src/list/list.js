import "./list.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ArticleInList from "./articleInList/articleInList";
import { useLocation, Link } from "react-router-dom";
import useArticles from "./useArticles";

function List() {
  let sortByPopular = useRef(null);
  let sortByDate = useRef(null);
  let sortByBackground = useRef(null);
  const location = useLocation();
  const propsCategory = location.state ? location.state.category : null;
  const [category, setCategory] = useState(propsCategory);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState("yes");

  //const [articles, setArticles] = useState([]);
  useEffect(() => {
    if (order === "yes") {
    }
    setCategory(propsCategory);
    setOffset(0);
    if (order === "no") {
      sortByBackground.current.style.width =
        document.querySelector(".listItemToquerySelector2").offsetWidth + "px";
    }
  }, [propsCategory, order]);
  useEffect(() => {
    window.scrollTo(0, 0);
    sortByBackground.current.style.width =
      sortByPopular.current.offsetWidth + "px";
    sortByBackground.current.style.left =
      sortByPopular.current.offsetLeft + "px";
  }, []);

  const { articles, hasMore, loading } = useArticles(category, offset, order);

  const observer = useRef();
  const lastArticle = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((x) => x + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const changeSort = (e, changeTo) => {
    sortByBackground.current.style.left = e.target.offsetLeft + "px";
    sortByBackground.current.style.width = e.target.offsetWidth + "px";
    if (changeTo === 1) {
      setOrder("no");
      setOffset(0);
    } else if (changeTo === 0) {
      setOrder("yes");
      setOffset(0);
    }
  };

  return (
    <div className="listBox">
      <div className="listHeader">
        <div className="widthFitContent">
          <ul className="listsortBy">
            <li
              ref={sortByPopular}
              onClick={(e) => changeSort(e, 0)}
              className="listItemToquerySelector"
            >
              Najpopularniejsze
            </li>
            <li
              ref={sortByDate}
              onClick={(e) => changeSort(e, 1)}
              className="listItemToquerySelector2"
            >
              Najnowsze
            </li>
            <div ref={sortByBackground} className="sortByBackground"></div>
          </ul>
        </div>
        <div className="listHeaderText">
          {category ? (
            <div className="listHeaderTextBox"> kategoria: {category} </div>
          ) : null}
          {category ? (
            <Link to={"/articles"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 13.426 13.423"
                className="closeCategory"
                fill="var(--textOnBackground)"
              >
                <path
                  id="Icon_ionic-ios-close"
                  data-name="Icon ionic-ios-close"
                  d="M19.589,18l4.8-4.8A1.124,1.124,0,0,0,22.8,11.616l-4.8,4.8-4.8-4.8A1.124,1.124,0,1,0,11.616,13.2l4.8,4.8-4.8,4.8A1.124,1.124,0,0,0,13.2,24.384l4.8-4.8,4.8,4.8A1.124,1.124,0,1,0,24.384,22.8Z"
                  transform="translate(-11.285 -11.289)"
                />
              </svg>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="test">
        {articles.map((x, i) =>
          articles.length === i + 1 ? (
            <ArticleInList object={x} key={i} ref={lastArticle} />
          ) : (
            <ArticleInList object={x} key={i} />
          )
        )}
      </div>
    </div>
  );
}

export default List;
