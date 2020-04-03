
import React,{ useState, useEffect } from 'react';
//import { NavLink } from 'react-router-dom';
import "./style2.css";
//import "./style1.css";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

const studDetails =  {
  name: 'Cahit Bakirci (cph-cb342)',
  study:'Datamatiker - 3 Sem, Spring2020',
  place: 'CPH Business, Lyngby'
};


export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul className="header">
          <li>
          
          <NavLink exact activeClassName="selected" to="/">Home</NavLink>
         
          </li>
         
          <li>
          
          <NavLink exact activeClassName="selected" to="/about">About</NavLink>
         
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/dashboard">Dashboard</NavLink>
          </li>
        
          <li>
            <NavLink exact activeClassName="selected" to="/stud">Student Details</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/joke">GetJoke</NavLink>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className = "content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/stud">
            <StudentDetails />
          </Route>

          <Route path="/joke">
            <Joke />
          </Route>

        </Switch>
        </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.



function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
  
function StudentDetails() {

    return (
      <div>
      <h3>{studDetails.name}</h3>  
       <h3>{studDetails.study}</h3>
       <h3>{studDetails.place}</h3>
      </div>
    );
}

function Joke() {
  
  let urlChuck =  'https://api.chucknorris.io/jokes/random'; 
  let urlDad = 'https://icanhazdadjoke.com/';
 
  const [fetchedJoke, setFetchedJoke] = useState([]);
  const[dadJoke, setDadJoke] = useState([]);
 
 
  const jokeHandler = () => {
      fetch(urlChuck)
      .then(res => res.json())
      .then(data => {
      setFetchedJoke(data);
      });
  };
  
 
  useEffect(() => {
   const interval = setInterval(() => {
     setDadJoke(
       fetch(urlDad, {
         headers: new Headers({
           accept: "application/json"
         })
       })
         .then(res => res.json())
         .then(data => {
           setDadJoke(data);
         })
     );
   }, 10000);
   return () => clearInterval(interval);
 }, []);
 
 
  return (
    <div>
    <button onClick={jokeHandler}>ChuckJoke</button>
    <p>{fetchedJoke.value}</p>
    <h3>Here Comes the Dad Jokes every 10'th second</h3>
    <p>{dadJoke.joke}</p>
    
    </div>
  );
}

