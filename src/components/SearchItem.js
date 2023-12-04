import React, {useEffect, useState} from 'react';
import chickenimg from "../images/chicken.jpg";
import beefimg from "../images/beef.jpg";
import lambimg from "../images/lambchops.jpg";
import cauliimg from "../images/cauliflower.jpg";
import yogimg from "../images/greekYogurt.jpg";
import fishimg from "../images/Fish.jpg";
import foodimage from "../images/shrimpsoup.jpg";
import { Dropdown, Form, Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { addFavourite, getRecipeStatus, addCookbook } from "../services/apiServices";

import BookBtn from "./BookBtn";

const SearchItem = (props) =>{

    const [isFav, setIsFav] = useState(null);                                //used to determine if the recipe is favourited
    const [creatingNewBook, setCreatingNewBook] = useState(false);  //used to reveal menu for creating new book
    const [newBookName, setNewBookName] = useState('');               //used to fill out new book names
    const [showAlert, setAlert] = useState(false);                  //used to alert users when they have tried to submit an empty title for a book

    useEffect(() => {
        const fetchData = async () => {
            try {

                const recipeStatus = await getRecipeStatus(props.id);
                setIsFav(recipeStatus);

            }
            catch(error){
                console.error("Error fetching Recipe: ", error);
            }
        };

        fetchData();
    }, []);

    const handleFavButton = async () => {
        try {
            const data = await addFavourite(props.id);
            setIsFav(data.favourite);

        } catch (error){
            console.error("Error toggling the recipe as favourite: ", error);
        }
    };

    const cookbookLinks = props.cookbooks.map((cookbook, index) => (
        <Dropdown.Item>{cookbook}</Dropdown.Item>
    ));

    //toggle the bool of creating cookbook
    const showNewBookFields = () => {
        setCreatingNewBook(!creatingNewBook);
    }

    const handleCreateCookbook = () =>{

        //verifying that users did not submit an empty field
        if(newBookName.trim().length === 0){
            //alert("The name you entered is blank");
            setAlert(true);
        } else {
            addCookbook(newBookName, props.id)
                .then(response => {

                    console.log("Cookbooks: ", response);
                    const formattedBooks = response.map(cookbook => (cookbook.playlist_name));
                    props.updateBooks(formattedBooks);

                })
                .catch(error => {
                    console.error('The following error occured: ', error);
                });
        }

        setCreatingNewBook(false);
        setNewBookName('');
    }

    const handleInputChange = (e) =>{
        setNewBookName(e.target.value);
    }

    const chooseRandImage = () => {

    }

    return (
        <>
            <div className="card mb-2">
                <div className="row align-items-center">

                    {/* Recipe preview image */}
                    <div className="col-md-4">
                        <Link to={`/recipe/${props.id}`}>
                            <img className="img-fluid rounded-start" src={foodimage} alt=""/>
                        </Link>
                    </div>

                    {/* Recipe title */}
                    <div className="col-md-6">
                        <div className="card-body">

                            <Link to={`/recipe/${props.id}`} className='text-decoration-none'>
                                <h1 style={{color: 'black'}} className="card-title text-decoration-none text-capitalize">{props.name}</h1>
                            </Link>

                        </div>
                    </div>

                    {/* Recipe two button styling section */}
                    <div className="col-md-2 d-flex justify-content-center">
                        {/* cookbook button */}
                        <Dropdown className="mr-2">
                            <Dropdown.Toggle style={{ backgroundColor: '#590209' }} className='border-0'>
                                <i className="bi bi-book-fill"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={`w-${creatingNewBook ? '600' : 'auto'}`}>
                                <Dropdown.Header>Cookbooks</Dropdown.Header>
                                {cookbookLinks}
                                <Dropdown.Item onClick={showNewBookFields}>New Book</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <BookBtn id={props.id} cookbooks={props.cookbooks}></BookBtn>

                        {/* Favourite button */}
                        <button className="btn" style={{ backgroundColor: '#590209' }} onClick={handleFavButton}>
                            <span style={{ color: 'white' }}>
                                {isFav ? (
                                    <i className="bi bi-heart-fill"></i>
                                ) : (
                                    <i className="bi bi-heart"></i>
                                )}
                            </span>
                        </button>
                    </div>

                </div>

                {/* Bootstrap menu that goes over all rendered html. Used to fill out and creat new cookboks */}
                <Modal show={creatingNewBook} onHide={showNewBookFields} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>New Cookbook</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Enter new cookbook name"
                                aria-label="Cookbook Name"
                                aria-describedby="basic-addon2"
                                value={newBookName}
                                onChange={handleInputChange}
                            />
                            <Button onClick={handleCreateCookbook} variant="success">Add</Button>

                        </InputGroup>
                    </Modal.Body>
                </Modal>

            </div>

            {/* shows alert when invalid text is entered while creating book */}
            {showAlert && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    The name you entered is blank.
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setAlert(false)}
                    ></button>
                </div>
            )}
        </>
    );
}

export default SearchItem;