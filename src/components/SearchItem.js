import React, {useEffect, useState} from 'react';
import foodimage from "../images/chicken.jpg";
import { Dropdown, Form, Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { addFavourite, getRecipeStatus, addCookbook } from "../services/apiServices";

const SearchItem = (props) =>{

    const [isFav, setIsFav] = useState(null);
    const [creatingNewBook, setCreatingNewBook] = useState(false);
    const [newBookName, setNewBookName] = useState('');

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
            setIsFav(data);

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

        addCookbook(newBookName, props.id)
            .then(response => {
                const cookbooks = response.cookbooks;

                if (cookbooks) {
                    const formattedBooks = cookbooks.map(cookbook => cookbook.playlist_name);
                    this.setState({ cookbooks: formattedBooks });
                    console.log("Here are the new books: ", formattedBooks);
                } else {
                    console.error('Invalid response format:', response);
                }
        })
            .catch(error => {
                console.error('The following error occured: ', error);
            });

        setCreatingNewBook(false);
        setNewBookName('');
    }

    const handleInputChange = (e) =>{
        setNewBookName(e.target.value);
    }

    return (
        <div className="card">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <img className="img-fluid rounded-start" src={foodimage} alt=""/>
                </div>
                <div className="col-md-6">
                    <div className="card-body">

                        <Link to={`/recipe/${props.id}`}>
                            <h1 className="card-title">{props.name}</h1>
                        </Link>

                    </div>
                </div>
                <div className="col-md-2 justify-content-center">
                    <div className="row">
                        <div className="col-6">
                            <button onClick={handleFavButton}> {isFav ? (<>Unfavourite</>) : (<>Favourite</>)} </button>
                            <Dropdown>
                                <Dropdown.Toggle variant="success">
                                    Cookbooks
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={`w-${creatingNewBook ? '600' : 'auto'}`}>
                                    <Dropdown.Header>Cookbooks</Dropdown.Header>
                                    {cookbookLinks}
                                    <Dropdown.Item onClick={showNewBookFields}>New Book</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

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
    );
}

export default SearchItem;