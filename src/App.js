import './App.css';
import Header from './header/header';
import Home from './home/home';
import Register from './register/register';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from './Modal/modal';
import List from './list/list';
import ArticleView from './article/article';
import Panel from './panel/panel';
import EditArticle from './edit/edit';

function App() {
  const notifications = useSelector(state => state.notifications);
  const logged = useSelector(state => state.isLogged);

  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" render={(props) => <Register {...props} loggedAlready={logged} />} />
        <Route exact path="/articles" component={List} />
        <Route exact path="/articles/:id" component={ArticleView} />
        <Route exact path="/panel" component={Panel} />
        <Route exact path="/add" component={EditArticle} />
        <Route exact path="/panel/:id" component={EditArticle} />
      </Switch>

      <div>
        {
          notifications.map((item, i) => <Modal key={i} color={item.color} keyValue={i} >{item.x}</Modal>)
        }
      </div>

    </Router>
  );
}

export default App;
