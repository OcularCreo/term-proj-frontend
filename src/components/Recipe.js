import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import foodimage from '../images/chicken.jpg';
import { Container } from 'react-bootstrap';
import {fetchRecipe, getCookBooks} from "../services/apiServices";
import {render} from "@testing-library/react";

import FavBtn from "./FavBtn";
import BookBtn from "./BookBtn";

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const [cookbooks, setBooks] = useState(null);
    const { recipeId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await fetchRecipe(recipeId);
                setRecipe(data);
            }
            catch(error){
             console.error("Error fetching Recipe: ", error);
            }
        };

        //get the cookbooks
        const retrieveBooks = async () => {
            getCookBooks()
                .then(cookbooks => {

                    const formattedBooks = cookbooks.map(cookbook => (cookbook.playlist_name));

                    setBooks(formattedBooks);
                })
                .catch(error => {
                    console.error('The following error occured: ', error);
                });
        }

        fetchData();
        retrieveBooks();
    }, []);


    //callback function needed to use the bookbtn
    const updateBooks = (newbooks) =>{
        setBooks(newbooks);
    }


    //returns a set of html for each tag in the recipe.
    const renderTags = () => {

        //do nothing if there isn't a recipe or any tags in the recipe
        if(!recipe || !recipe.tags){
            console.log("No recipes or tags");
            return null;
        }

        const tagsArray = JSON.parse(recipe.tags.replace(/'/g, '"'));

        return tagsArray.map((tag) => (

            <span className='badge bg-secondary-subtle mx-1'>{tag}</span>

        ));
    }

    return (
        <>
            {recipe ? (
                <Container>

                    {/* Card div (contains all info about recipe) */}
                    <div className="card mt-5" style={{width: "100%"}}>

                        {/* Card image */}
                        <img src={foodimage} className="card-img-top" alt="Recipe Visual" style={{objectFit: "cover"}} height="400"/>
                        <div className="card-body">

                            {/* Card/recipe name */}
                            <div className="row">
                                <h1 className="card-title text-md-start text-sm-center text-capitalize">{recipe.name} </h1>
                            </div>

                            {/* Favourite and add to cookbook buttons */}
                            <div className="row justify-content-start">
                                <div className="col-md-2 col-sm-12">
                                    <a href="/" className="btn btn-primary w-100 h-100 text-center">Favourite</a>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-12">
                                    <a href="/" className="btn btn-primary w-100 h-100 text-center">Add to Cookbook</a>
                                </div>
                                <FavBtn id={recipe.id}></FavBtn>
                                {cookbooks && ( <BookBtn id={recipe.id} cookbooks={cookbooks} onBookCreated={updateBooks}></BookBtn> )}
                            </div>

                            {/* tabs area */}
                            <div className="row card-text my-3">
                                <h4>Tags<br/></h4>
                                <div className=''>
                                    {renderTags()}
                                </div>
                            </div>

                            {/* time display & number of ingredients display*/}
                            <div className="row my-4">
                                <div className="col-1">
                                    {/* Only render recipe.minutes if it exists */}
                                    <h3>{recipe.minutes && (recipe.minutes)}</h3>
                                    <h3>Mins</h3>
                                </div>
                                <div className="col-2">
                                    {/* Only render recipe.ingred_num if it exists */}
                                    <h3>{recipe.ingred_num && (recipe.ingred_num)}</h3>
                                    <h3>Ingredients</h3>
                                </div>
                            </div>

                            {/* recipe steps plus section to adjust proportions */}
                            <div className="row">
                                <div className="col-10 card-text">
                                    <ol>
                                        <li>Season</li>
                                        <li>Cook</li>
                                        <li>Eat</li>
                                    </ol>
                                </div>
                                <div className="col-2" style={{backgroundColor: 'blue'}}>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            ) : (
                <p>Loading recipe...</p>
            )}
        </>
    );

}

export default RecipeDetails;