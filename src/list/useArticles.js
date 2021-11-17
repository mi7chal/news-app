import { useEffect, useState } from "react";

export default function useArticles(category, offset, order) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setArticles([]);
  }, [order, category]);

  useEffect(() => {
    setLoading(true);
    let link = `http://localhost/blogg/api/list.php?offset=${offset}&order=${order}`;

    if (category != null) link = link.concat(`&category=${category}`);
    fetch(link, { credentials: "include", method: "GET" })
      .then((x) => x.json())
      .then((res) => {
        setArticles((x) => {
          if (res.status === 1) return [...new Set([...x, ...res.data])];
          else return x;
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {});
  }, [order, category, offset]);

  return { loading, articles, hasMore };
}
