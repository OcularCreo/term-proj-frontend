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

        const fetchRecipeData = async () => {
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

        fetchRecipeData();
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

    //creating html elements for all the ingredients listed in the recipe
    const renderRecipeList = (type) =>{

        //do nothing if there isn't a recipe or any tags in the recipe
        if(!recipe || !recipe[type]){
            console.log("No recipes or tags");
            return null;
        }

        const itemsArray = JSON.parse(recipe[type].replace(/'/g, '"'));

        return itemsArray.map((item) => (

            <li>{item}</li>

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
                        <div className="card-body p-5">

                            {/* Card/recipe name */}
                            <div className="row">
                                <h1 className="card-title text-md-start text-sm-center text-capitalize">{recipe.name} </h1>
                            </div>

                            {/* Favourite and add to cookbook buttons */}
                            <div className="row my-3">
                                <div className='d-flex justify-content-center justify-content-md-start'>
                                    <span className='mx-1'><FavBtn id={recipe.id}></FavBtn></span>
                                    {cookbooks && ( <BookBtn id={recipe.id} cookbooks={cookbooks} onBookCreated={updateBooks}></BookBtn> )}
                                </div>
                            </div>

                            {/* tabs area */}
                            <div className="row card-text my-4">
                                <h5>Tags<br/></h5>
                                <div>
                                    {renderTags()}
                                </div>
                            </div>

                            {/* time display & number of ingredients display*/}
                            <div className="my-4 d-flex justify-content-start">
                                <div className="">
                                    {/* Only render recipe.minutes if it exists */}
                                    <h3>{recipe.minutes && (recipe.minutes)}</h3>
                                    <h3>Mins</h3>
                                </div>
                                <div className="mx-4">
                                    {/* Only render recipe.ingred_num if it exists */}
                                    <h3>{recipe.ingred_num && (recipe.ingred_num)}</h3>
                                    <h3>Ingredients</h3>
                                </div>
                            </div>

                            {/* recipe steps plus section to adjust proportions */}
                            <div className="row">
                                <h2>Ingredients</h2>
                                <div className="col-10 card-text">
                                    <ol>
                                        {renderRecipeList('ingreds')}
                                    </ol>
                                </div>
                                {/*Probably remove this soon*/}
                                <div className="col-2" style={{backgroundColor: 'blue'}}>
                                </div>
                            </div>

                            {/* recipe steps plus section to adjust proportions */}
                            <div className="row mt-4">
                                <h1>Instructions</h1>
                                <div className="col-10 card-text">
                                    <ol>
                                        {renderRecipeList('steps')}
                                    </ol>
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