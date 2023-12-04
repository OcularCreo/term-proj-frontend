import React, { useState } from 'react';
import {addFavourite} from "../services/apiServices";

const FavBtn = (props) =>{

    const [isFav, setIsFav] = useState(false);

    //handling when users click on the fav button
    const handleFavButton = async () =>{
        try {
            const data = await addFavourite(props.id);
            setIsFav(data.favourite);

        } catch (error){
            console.error("Error toggling the recipe as favourite: ", error);
        }
    }

    //return html for the favourite button
    return (
        <>
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
        </>
    );

}

export default FavBtn;