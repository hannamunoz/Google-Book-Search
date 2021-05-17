import React, { Component } from "react";
import { Container } from "../components/Grid/Grid";
import Nav from "../components/Nav/Nav";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import {Input, SubmitBtn} from "../components/Search/Search";
import API from "../utils/API";
import ResultList from "../components/ResultList/ResultList";

class Home extends Component {

    state = {
        books: [],
        search: ""
    };



    searchBooks = () => {
        API.googleBooks(this.state.search)
            .then(res => {
                console.log("This is the res.data", res.data.items)
                this.setState({
                    books: res.data.items,
                    search: ""
                })
            })
            .catch(err => console.log(err));
    };



    handleFormSubmit = event => {
        event.preventDefault();
        this.searchBooks();
    };


    saveGoogleBook = currentBook => {
        console.log("This is the current book", currentBook);
        API.saveBook({
            id: currentBook.id,
            title: currentBook.title,
            authors: currentBook.authors,
            description: currentBook.description,
            image: currentBook.image,
            link: currentBook.link
        })
        .then(res => console.log("POST successful to DB", res))
        .catch(err => console.log("Here is the error", err));
    }


    render() {
        return (
            <div>
                <Nav />
                <Container fluid>
                    <Jumbotron />
                    <form>
                        <h5>Search for Books</h5>
                        <Input
                            value={this.state.search}
                            onChange={this.handleInputChange}
                            name="search"
                            placeholder="e.g. The Lord of the Rings"
                        />
                        <SubmitBtn onClick={this.handleFormSubmit}/>
                    </form>

                    {this.state.books.length ? (
                        <ResultList
                        bookState={this.state.books}
                        saveGoogleBook={this.saveGoogleBook}>
                        </ResultList>
                    ) : (
                        <div>
                            <hr/>
                        <p style={{fontStyle: "italic"}}>No results found</p>
                        </div>
                    )}

                </Container>
            </div>
        )
    }
}

export default Home