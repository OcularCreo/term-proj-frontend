import foodimage from "../images/chicken.jpg";
import FavBtn from "./FavBtn";
import BookBtn from "./BookBtn";
import React from "react";
import {Link} from "react-router-dom";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";


const RecipeCard = (props) =>{

    return(

        <div className='col-lg-4 col-md-6 col-sm-12 pb-3'>
            <div className="card">

                {/* Card image */}
                <Link to={`/recipe/${props.id}`}>
                    <img className="card-img-top" src={foodimage} alt=""/>
                </Link>
                <div className="card-body p-4">

                    {/* Card/recipe name */}
                    <div className="row">
                        <Link to={`/recipe/${props.id}`} className='text-decoration-none'>
                            <h1 style={{color: 'black'}} className="card-title text-center text-capitalize">{props.name}</h1>
                        </Link>
                    </div>

                    {/* Favourite and add to cookbook buttons */}
                <div className="row my-3">
                    <div className='d-flex justify-content-center justify-content-center'>
                        {/*<span className='mx-1'><FavBtn id={props.id}></FavBtn></span>*/}
                        {props.cookbooks && ( <BookBtn id={props.id} cookbooks={props.cookbooks} onBookCreated={props.updateBooks}></BookBtn> )}
                        {props.toggleShowUnfav && (
                            <>
                                <span className={'mx-1'}></span>
                                <div className='btn' style={{background: '#590209', color: 'white'}} onClick={()=>{props.toggleShowUnfav(); props.setUnfavId(props.id);}}>
                                    <i className="bi bi-x-circle-fill"></i>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                </div>
            </div>
        </div>

    );

}

export default RecipeCard;