import React, { useState, useEffect } from 'react';
import {Button, Dropdown, FormControl, InputGroup, Modal} from "react-bootstrap";
import {addCookbook, fetchRecipe, getCookBooks} from "../services/apiServices";

const BookBtn = (props) =>{

    const [creatingNewBook, setCreatingNewBook] = useState(false);  //used to reveal menu for creating new book
    const [newBookName, setNewBookName] = useState('');               //used to fill out new book names
    const [showAlert, setAlert] = useState(false);                  //used to alert users when they have tried to submit an empty title for a book


    //makes sure that the users has entered a valid name and then makes a post request to backend
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
                    props.setBooks(formattedBooks);

                })
                .catch(error => {
                    console.error('The following error occured: ', error);
                });

            //only close the model if the input was not empty
            setCreatingNewBook(false);
            setNewBookName('');
        }


        //only close the modal if the input was not empty
        /*
        if(newBookName.trim().length > 0){

        }
        */


    }

    //creating a link for each existing cookbook attached to the account
    const cookbookLinks = props.cookbooks.map((cookbook, index) => (
        <Dropdown.Item>{cookbook}</Dropdown.Item>
    ));

    //reading in each character that the user enters in the text field
    const handleInputChange = (e) =>{
        setNewBookName(e.target.value);
    }

    //toggle the bool of creating cookbook
    const showNewBookFields = () => {
        setCreatingNewBook(!creatingNewBook);
    }

    //return html of the cookbook btn
    return (
      <>
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

              </Modal.Body>
          </Modal>


      </>
    );

}

export default BookBtn;