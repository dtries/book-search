import React, { Component } from "react";
import "./App.css";
import "./utils/API";
import API from "./utils/API";
import BookDetail from "./components/BookDetail/BookDetail";
import BookSearchEntry from "./components/BookSearchEntry"
import SearchGoogleApiButton from "./components/SearchGoogleAPIButton";
// import apiRoutes from "../routes/apiRoutes";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      result: [],
      search: ""
    };
  }

  // componentDidMount() {
  //   this.searchBooks();
  // };

  handleInputChange = event => {
    const {value} = event.target;
    this.setState({ 
      search: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(`Search state is: ${this.state.search}`);
    this.searchBooks(this.state.search);
  };


  searchBooks = query => {
    API.search(query)
      .then (res => 
        this.setState({ result: res.data.items })) //result: res.data.items[0].volumeInfo  //grabs information about the 1st object in array [0]
      .catch(err => console.log(`The error is ${err}`)); 
      
  };



  render() {
    // console.log(`The result is:  ${JSON.stringify(this.state.result, null, 3)}`);
    // let ar = this.state.result;
    let pic;
    this.state.result.map(data => (
        pic=data.volumeInfo.imageLinks.thumbnail
    ));

    console.log(pic);
    // var bookData = this.state.result;
    // let tilImage = this.state.result.imageLinks;
    // console.log(this.state.result.imageLinks.smallThumbnail);

    // console.log(Object.values(tilImage));
    // console.log(tilImage);
    return (
      <div className="App">
          <div className="container">
          
          <nav>
            <div className="nav-wrapper">
              <a href="/" className="left">Book Search</a>
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><a href="search.html">Search</a></li>
                <li><a href="saved.html">Saved</a></li>
              </ul>
            </div>
          </nav>

          <div className="App-header">
            <h2>Book Search
            </h2>
          </div>

          <div className="search-area">
            <h2>Search For a Book
            </h2>

            <BookSearchEntry 
              name="googleBookSearch"
              value={this.state.search}
              onChange={this.handleInputChange}
              placeholder="Enter a Book Title Here"
            />

            <SearchGoogleApiButton 
              onClick={this.handleFormSubmit}
            > 
            Search 
            </SearchGoogleApiButton>

          </div>

          <div className="results-area">
            <h2>Results
            </h2>
        
             {this.state.result.map(bookData => (
                <BookDetail 
                  key={bookData.id}
                  title={bookData.volumeInfo.title}
                  authors={bookData.volumeInfo.authors}
                  pic={bookData.volumeInfo.imageLinks.thumbnail ? bookData.volumeInfo.imageLinks.thumbnail : "Pic Not Available"}
                  publisher={bookData.volumeInfo.publisher}
                  synopsis={bookData.volumeInfo.description}
                />
            ))}

          </div>

        </div>
      </div>
    );
  }
}


export default App;

