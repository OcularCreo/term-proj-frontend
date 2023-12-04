import React, {Component} from "react";
import {Button, Container, FormControl, InputGroup, Modal, ToggleButton} from "react-bootstrap";
import { ButtonGroup, ToggleButtonGroup } from "react-bootstrap";
import {addFavourite, getCookBooks, getFavs} from "../services/apiServices";
import foodimage from "../images/chicken.jpg";
import FavBtn from "./FavBtn";
import BookBtn from "./BookBtn";
import RecipeCard from "./RecipeCard";
import SearchItem from "./SearchItem";

class Library extends Component{

    constructor(props) {
        super(props);

        this.state ={
            cookbooks: [],
            favourites: [],
            viewing: 'favourites',
            showUnfav: false,
            unFavId: '',
        }
    }

    componentDidMount() {

        //retrieving all recipies that have been favourite by the user
        this.retrieveFavs();

        //retriving all the cookbooks made by the user along with the recipes in them
        getCookBooks().then(cookbooks => {

            const formattedBooks = cookbooks.map(cookbook => (cookbook.playlist_name));

            this.setState({cookbooks: formattedBooks});
        })
            .catch(error => {
                console.error('The following error occured: ', error);
            });
    }

    //deals with if user is viewing cookbooks or favourited recipes in the library page
    handleRadioChange = (e) =>{
        this.setState({viewing: e.target.value});

        if(this.state.viewing === 'favourites'){
            this.retrieveFavs();
        }

    }

    //call back function for when users create a new book
    updateBooks = (newBooks) =>{
        this.setState({cookbooks: newBooks});
    };

    //get the all the users favourited recipes
    retrieveFavs = () =>{
        getFavs()
            .then(recipes => {

                let formattedRecipes = Object.values(recipes);

                this.setState({favourites: formattedRecipes });
            })
            .catch(error => {
                console.error('The following error occured: ', error);
            });

    }

    //render out all the favourites the user may have
    renderFavs = () => {

        return this.state.favourites.map(recipe => (

            <RecipeCard
                id={recipe.id}
                name={recipe.name}
                cookbooks = {this.state.cookbooks}
                updateBooks = {this.updateBooks}
                toggleShowUnfav={this.toggleShowUnfav}
                setUnfavId={this.setUnfavId}
            />

        ));

    }

    //toggle the bool of creating cookbook
    toggleShowUnfav = () => {
        this.setState({
            showUnfav: !this.state.showUnfav,
        });
    }

    //call back function used to keep track of which recipe might be unfaved
    setUnfavId = (recipeId) =>{
        this.setState({
            unFavId: recipeId,
        });
    }

    //function used to remove from favourites on library page
    removeFav = () =>{

        if(this.state.unFavId){

            addFavourite(this.state.unFavId)
                .then(response =>{

                    this.retrieveFavs();                //retrieve the new favourites
                    this.renderFavs();                  //render the favourites again
                    this.setState({unFavId: ''}); //reset the un-favourited recipe id

                })
                .catch(error =>{
                    console.error('The following error occured: ', error);
                })

        } else {
            console.log("Error un-favourited ID blank");
        }

        //hide the modal window
        this.toggleShowUnfav();

    }

    renderBookSections = () =>{

        return this.state.cookbooks.map(book => (
            <div className='mt-4'>
                <h1>{book}</h1>
            </div>
        ));

    }


    render() {

        return(
          <>
              <Container fluid className="d-flex align-items-center justify-content-center" style={{height: "200px", backgroundColor: "#A61731"}}>
                  <h1 style={{color: 'white'}} >LIBRARY</h1>
              </Container>

              {/*radio buttons located at the top (Favourites | Cookbooks)*/}
              <ButtonGroup toggle className='w-100 pt-0'>
                  <ToggleButton
                      className='border-0 rounded-0'
                      id='1'
                      type='radio'
                      name='options'
                      value='favourites'
                      checked={this.state.viewing === 'favourites'}
                      variant='danger'
                      onChange={this.handleRadioChange} >
                      Your Favourites
                  </ToggleButton>
                  <ToggleButton
                      className='border-0 rounded-0'
                      id='2'
                      type='radio'
                      name='options'
                      value='books'
                      checked={this.state.viewing === 'books'}
                      variant='danger'
                      onChange={this.handleRadioChange} >
                      Your Cookbooks
                  </ToggleButton>
              </ButtonGroup>

              {/*render recipes based off of what button the user has selected*/}
              {this.state.viewing === 'favourites' ? (
                  <Container className='mt-5'>
                      <div className='row'>
                          {this.renderFavs()}
                      </div>

                      {/* Bootstrap menu that goes over all rendered html. Used to fill out and creat new cookboks */}
                      <Modal show={this.state.showUnfav} onHide={this.toggleShowUnfav} centered>
                          <Modal.Header closeButton>
                              <Modal.Title>REMOVE FAVOURITE</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              <h2>You are about to remove the recipe as a favourite.</h2>
                              <p>Are you sure you want to do this?</p>
                              <div className='mt-4'>
                                  <Button variant={"danger"} onClick={this.removeFav}>Remove From Favourite</Button>
                                  <span className='mx-1'></span>
                                  <Button variant={"primary"} onClick={this.toggleShowUnfav}>Cancel</Button>
                              </div>
                          </Modal.Body>
                      </Modal>

                  </Container>
              ) : (
                  <Container>
                      <div className='row'>
                          {this.renderBookSections()}
                      </div>
                  </Container>
              )}

          </>
        );
    }

}

export default Library;