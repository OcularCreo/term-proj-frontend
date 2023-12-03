import React, {Component, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { fetchRecipes, getCookBooks, addCookbook} from "../services/apiServices";
import SearchItem from "./SearchItem";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state ={
            searchResults: [],
            searchValue: '',
            lastSearched: '',
            hasSearched: 'false',
            cookbooks: [],
            totalPages: 0,
            currentPage: 0,
        }
    }

    handleChange = (e) => {
        this.setState({searchValue: e.target.value});
    }

    executeSearch = () =>  {
        fetchRecipes(this.state.searchValue, this.state.currentPage)
            .then(recipes => {
                const formattedRecipes = recipes.map(recipe => ({
                    ...recipe
                }));
                this.setState({
                    searchResults: formattedRecipes,
                    lastSearched: this.state.searchValue,
                    searchValue: '',
                    hasSearched: true,
                });
            })
            .catch(error => {
                console.error('The following error occured: ', error);
            });

        getCookBooks()
            .then(cookbooks => {

                const formattedBooks = cookbooks.map(cookbook => (cookbook.playlist_name));

                this.setState({cookbooks: formattedBooks});
                console.log(formattedBooks);
            })
            .catch(error => {
                console.error('The following error occured: ', error);
            });
    }

    nextPage = () => {
        this.setState((prevState) => ({
            currentPage: prevState.currentPage + 1,
            searchValue: prevState.lastSearched,
        }),
            () => {
                this.executeSearch();
            }
        );

    }

    prevPage = () => {
        this.setState((prevState) => ({
                currentPage: Math.max(prevState.currentPage - 1, 0),
                searchValue: prevState.lastSearched,
            }),
            () => {
                this.executeSearch();
            }
        );
    }

    renderRecipes = () => {
        return this.state.searchResults.map(recipe => (

            <SearchItem
                id={recipe.id}
                name={recipe.name}
                cookbooks = {this.state.cookbooks}
            />

        ));
    }

    render(){
        const { hasSearched } = this.state;

        return (
            <>
                <Container fluid className="mb-5" style={{height: "200px", backgroundColor: "Red"}}>
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col col-8" style={{backgroundColor: "blue"}}>

                            <div className="input-group">
                                <input type="text" value={this.state.searchValue} onChange={this.handleChange} className="form-control" placeholder="Search"/>
                                <div className="input-group-append">
                                    <button className="btn btn-success" type="button" onClick={this.executeSearch}>Button</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
                <Container style={{backgroundColor: '#F2CEAE', padding:'0'}}>
                    <div className="row mb-3">
                        {hasSearched ? (<h1>You Search For {this.state.lastSearched}</h1>) : (<h1>Search for recipes above!</h1>)}
                    </div>
                    {this.renderRecipes()}
                </Container>

                {this.state.lastSearched ? (
                    <>
                        <button className="btn btn-success" type="button" onClick={this.nextPage}>Next Page</button>
                        <button className="btn btn-success" type="button" onClick={this.prevPage}>Prev Page</button>
                    </>
                    ): (<></>)}

            </>
        );
    }
}

export default Search;