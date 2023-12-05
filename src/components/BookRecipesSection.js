import React, {useEffect, useState} from 'react';
import {getBookRecipes} from "../services/apiServices";
import RecipeCard from "./RecipeCard";

const BookRecipesSection = (props) =>{

    const [bookRecipes, setRecipes] = useState(null);


    useEffect(() => {
        const retrieveBookRecipes = async () =>{

            getBookRecipes(props.book)
                .then(recipes => {

                    let formattedRecipes = Object.values(recipes);
                    setRecipes(formattedRecipes);

                })
                .catch(error => {
                    console.error('The following error occured: ', error);
                });
        }

        console.log("HEY THERE");

        retrieveBookRecipes();

    }, []);

    const renderRecipes = () =>{

        console.log("accessed");

        if(bookRecipes){
            return bookRecipes.map(recipe => (

                <>
                    <RecipeCard
                        id={recipe.id}
                        name={recipe.name}
                        isbook={true}
                    />
                </>

            ));
        } else {
            return (<></>); //return nothing
        }

    }

    return (
      <>
          <div className='d-flex mb-3'>
              <h1 className=''>{props.book}</h1>
              <div className='mx-1'></div>
              <div className='btn text-center align-middle' onClick={()=>props.handleDeleteBook(props.book)}><i className="bi bi-trash3-fill"></i></div>
          </div>
          {renderRecipes()}
      </>
    );

}

export default BookRecipesSection;