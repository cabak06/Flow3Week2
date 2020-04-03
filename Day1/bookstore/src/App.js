import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";
import './App.css';

function App({bookFacade}) {
  
  return (
<div>
  <Header />
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/products">
      <Products bookFacade={bookFacade}/>
    </Route>
    <Route path="/add-book">
      <AddBook bookFacade={bookFacade}/>
    </Route>
    <Route path="/find-book">
      <FindBook bookFacade={bookFacade}/>
    </Route>
    <Route path="/company">
      <Company />
    </Route>
    <Route path="/no-match">
      <NoMatch/>
    </Route>
  </Switch>
</div>

  );
}



function Header() {
  return (
    <ul className="header">
    <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
    <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
    <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
    <li><NavLink activeClassName="active" to="/find-book">Find Book</NavLink></li>
    <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
    <li><NavLink activeClassName="active" to="/no-match">No Match</NavLink></li>
  </ul>
  
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Products( {bookFacade} ) {
const books = bookFacade.getBooks();  
let { path, url } = useRouteMatch();

return (
    <div>
     <h2>Products</h2>
     <p>Total amount of books: {bookFacade.getBooks().length}</p>
      
      <ul>
            {bookFacade.getBooks().map (book => { return (
               <li key={book.id}>
               {book.title} 
               &nbsp;
               <Link to={`${url}/${book.id}`}>Details</Link>
               </li>
             );
          })}
         </ul>
         <br/> 

          <Switch>
              <Route exact path={path}>
                <h3>Please select a Book</h3>
              </Route>
              <Route path={`${path}/:bookId`}>
              <Details bookFacade={bookFacade}/>
              </Route>
          </Switch>


    </div>
  );
}


function FindBook({bookFacade}){

  const[bookId,setBookId] = useState("");
  const[book,setBook] = useState(null);
  
  const findBook = () => {

    const foundBook = bookFacade.findBook(bookId);
    setBook(foundBook);
  };

  const deleteBook = id => {
    bookFacade.deleteBook(id);
    setBook(null);
  };

return (

<div>
<h2>Find Book</h2>

<input id="book-id" placeholder="Enter Book ID" onChange={(event)=>{setBookId(event.target.value)}}/>
<button onClick={findBook}>Find Book</button>

{book && (

  <div>
    <p>Title: {book.title}</p>  
    <p>ID: {book.id}</p>
    <p>Info: {book.info}</p>
  <div>
     
     <button onClick={() => deleteBook(book.id)}>Delete Book</button>
    </div>
    </div>
    )}
    {!book && <p>Enter book-Id to See</p>}
  </div>
);
}


function Details({bookFacade}){

  

  const { bookId } = useParams();
  const book = bookFacade.findBook(bookId);

  const showBook = book ? (
    <div>
      <p>Title: {book.title}</p>
      <p>ID: {book.id}</p>
      <p>Info: {book.info}</p>
      </div>
     ) : (

       <p>Book Not Found</p>
     );
     return <div>{showBook}</div>;
     }



function AddBook( {bookFacade} ) {
 
const emptyBook = {id: '', title: '', info:''};
const [book, setBook] = useState({...emptyBook});
 
const handleChange = e => {
 const {id, value} = e.target;
 setBook({ ...book, [id]: value});
 console.log(book.title);
 console.log(book.info);
};

const handleSubmit = e => {
 e.preventDefault();
 bookFacade.addBook(book);
 setBook({ ...emptyBook});
};

  return (
    <div>
      <h2>Add Book</h2>
        <form>
         <input
          id="title" value={book.title} placeholder="Add Title" onChange={handleChange}/>
         
         <br/>
         <input id='info' value={book.info} placeholder="Add Info" onChange={handleChange}/>
          <br/>
          <button onClick={handleSubmit}>Save</button>
        </form>    
  
    </div>
  );
}


function Company() {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>No Match</h2>
    </div>
  );
}

export default App;



