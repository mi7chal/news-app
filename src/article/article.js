import './article.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function ArticleView(props) {

    const [article, setArticle] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        async function downloadFetch() {
            const response = await fetch(`http://localhost/blogg/api/article.php?id=${id}`, { credentials: 'include', method: 'GET' });
            const res = await response.json();
            setArticle(res.data);
            console.log(res);
        }
        downloadFetch();

    }, [id])
    if (!article)
        return null;

    return (
        <div className="articleViewBox">
            <div className="articleViewImage" style={{ backgroundImage: `url('http://localhost/blogg/api/articleImages/${article.id}/${article.zdjecie}')` }} />
            <div className="articleViewCategory">
                {article.kategoria}
            </div>
            <div className="articleViewCategory">
                {article.dataUtworzenia}
            </div>
            <h1 className="articleViewTitle toSelect">{article.tytul}</h1>
            <div className="articleViewContent toSelect">{article.tresc}</div>
            <ul className="articleViewTagBox">

                {
                    JSON.parse(article.tagi).map((x, i) => <li key={i} className="articleViewTag">{x}</li>)
                }
            </ul>
            <div className="articleViewAutor toSelect">Autor: {article.autor}</div>

        </div>
    );
}

export default ArticleView;
