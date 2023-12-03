import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import foodimage from '../images/chicken.jpg';
import { Container } from 'react-bootstrap';
import {fetchRecipe} from "../services/apiServices";

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
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

        fetchData();
    }, []);

    return (
        <>
            {recipe ? (
                <Container>
                    <div className="card mt-5" style={{width: "100%"}}>
                        <img src={foodimage} className="card-img-top" alt="Recipe Visual" style={{objectFit: "cover"}} height="400"/>
                        <div className="card-body">
                            <div className="row">
                                <h1 className="card-title text-md-start text-sm-center">{recipe.name} </h1>
                            </div>
                            <div className="row justify-content-start">
                                <div className="col-md-2 col-sm-12">
                                    <a href="/" className="btn btn-primary w-100 h-100 text-center">Favourite</a>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-12">
                                    <a href="/" className="btn btn-primary w-100 h-100 text-center">Add to Cookbook</a>
                                </div>
                            </div>
                            <div className="row card-text">
                                <h4>Tags<br/></h4>
                                <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                    <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                                </div>
                                <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                    <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                                </div>
                                <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                    <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <h3>45</h3>
                                    <h3>Mins</h3>
                                </div>
                                <div className="col-2">
                                    <h3>10</h3>
                                    <h3>Ingredients</h3>
                                </div>
                            </div>
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

/*
class RecipeP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {},
        }
    }

    componentDidMount () {

        const urlsParts = window.location.pathname.split('/recipe/');
        console.log(urlsParts);

        fetchRecipe(urlsParts[1])
            .then(recipe => {
                this.setState({recipe: recipe})
                console.log({recipe});
            })
            .catch(error => {
                console.error('The following error occured: ', error);
            });

    }

    render(){

        const { recipe } = this.state;
        console.log(recipe.name);

        return (
            <>
                <Container>
                    <div className="card mt-5" style={{width: "100%"}}>
                        <img src={foodimage} className="card-img-top" alt="Recipe Visual" style={{objectFit: "cover"}} height="400"/>
                        <div className="card-body">
                            <div className="row">
                                <h1 className="card-title text-md-start text-sm-center"> NAME: {recipe.name} </h1>
                            </div>
                            <div className="row justify-content-start">
                                <div className="col-md-2 col-sm-12">
                                    <a href="/" className="btn btn-primary w-100 h-100 text-center">Favourite</a>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-12">
                                    <a href="/" className="btn btn-primary w-100 h-100 text-center">Add to Cookbook</a>
                                </div>
                            </div>
                            <div className="row card-text">
                                <h4>Tags<br/></h4>
                                <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                    <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                                </div>
                                <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                    <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                                </div>
                                <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                    <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <h3>45</h3>
                                    <h3>Mins</h3>
                                </div>
                                <div className="col-2">
                                    <h3>10</h3>
                                    <h3>Ingredients</h3>
                                </div>
                            </div>
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
            </>
        );
    }
}

export default RecipeP;

*/

/*

function GetRecipe(){
    const { recipeId } = useParams();
    let retrieved = {};

    return fetchRecipes(recipeId)
        .then(recipe => {
            retrieved = {...recipe}[0]; //always want the first one because only one recipe sent at a time.
            console.log(retrieved);
        })
        .catch(error => {
            console.error('The following error occured: ', error);
        });


}



function RecipePage () {

    let formattedRecipe = GetRecipe();

    console.log("outside of function: " + formattedRecipe.name);

    return (

        <>
            <Container>
                <div className="card mt-5" style={{width: "100%"}}>
                    <img src={foodimage} className="card-img-top" alt="Recipe Visual" style={{objectFit: "cover"}} height="400"/>
                    <div className="card-body">
                        <div className="row">
                            <h1 className="card-title text-md-start text-sm-center"> NAME: {formattedRecipe.name}</h1>
                        </div>
                        <div className="row justify-content-start">
                            <div className="col-md-2 col-sm-12">
                                <a href="/" className="btn btn-primary w-100 h-100 text-center">Favourite</a>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-12">
                                <a href="/" className="btn btn-primary w-100 h-100 text-center">Add to Cookbook</a>
                            </div>
                        </div>
                        <div className="row card-text">
                            <h4>Tags<br/></h4>
                            <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                            </div>
                            <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                            </div>
                            <div className="rounded" style={{backgroundColor: "blue", width: "100px"}}>
                                <h5 className="text-center align-middle"><span className="align-middle">test</span></h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <h3>45</h3>
                                <h3>Mins</h3>
                            </div>
                            <div className="col-2">
                                <h3>10</h3>
                                <h3>Ingredients</h3>
                            </div>
                        </div>
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
        </>
    );
}

export default RecipePage;

*/
