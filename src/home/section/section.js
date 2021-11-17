import React from 'react';
import './section.css';
import Article from './article/article';
function Section(props) {


  return (
    <div className="section">
      <div className="articleHeader">
        <h3 >{props.articlesList.title}</h3>
        <div className="sectionLine"></div>
      </div>

      <div className="articles">
      {
        props.articlesList.body.map((article, i) =>
          <Article key={article.id} articleObj={article} type={i===0?false:true} />
        )
      }
      </div>
    </div>
  );
}

export default Section;
