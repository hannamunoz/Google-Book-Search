import React, { Component } from 'react';
import { Container } from "../components/Grid/Grid";
import Nav from "../components/Nav/Nav";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import API from "../utils/API";
import SavedList from "../components/SavedList/SavedList";


class Saved extends Component {

    state = {
        savedBooks: []
    }

    componentDidMount = () => {
        this.getBooks()
    }

    deleteGoogleBook = currentBook => {
        API.deleteGoogleBook( currentBook.id )
        .then(res => {
            console.log("This book was deleted", res);
            this.getBooks();
        })
        .catch(err => {
            console.log("The error", err);
        })
    }


    getBooks = () => {
        API.getBooks()
        .then(res => {
            this.setState({
                savedBooks: res.data
            })
            console.log("Here is the res from getBooks", res);
        })
        .catch(err => {
            console.log("The error", err);
        })
    }


    render() {
        return (
            <div>
                <Nav />
                <Container fluid>
                <Jumbotron />
                {this.state.savedBooks.length ? (
                    <SavedList
                    bookState={this.state.savedBooks}
                    deleteGoogleBook={this.deleteGoogleBook}
                    >
                    </SavedList>
                ) : (
                    <h5>No results found</h5>
                )}
                </Container>
            </div>
        )
    }
}


export default Saved