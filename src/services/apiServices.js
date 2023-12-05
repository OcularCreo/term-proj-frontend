import recipe from "../components/Recipe";

const API_URL = 'http://127.0.0.1:8000';

export function fetchRecipes(search_param, pagenum) {
    return fetch(`${API_URL}/search/${search_param}/${pagenum}`, { method: 'GET'})
        .then(response => {
            if(!response.ok){
                throw new Error('Network response is NOT OKAY');
            }

            //return the Json response
            return response.json();
        })
        .then(recipes => recipes.map(recipe => ({...recipe})))
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        });
}

export function fetchRecipe(recipe_id) {
    return fetch(`${API_URL}/showRecipe/${recipe_id}`, { method: 'GET'})
        .then(response => {
            if(!response.ok){
                throw new Error('Network response is NOT OKAY');
            }

            //return the Json response
            return response.json();
        })
        .then(recipe => ({...recipe}))
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        });
}

export function getRecipeStatus(recipe_id) {
    return fetch(`${API_URL}/favRecipe/${recipe_id}`, { method: 'GET'})
        .then(response => {
            if(!response.ok){
                throw new Error('Network response is NOT OKAY');
            }

            //return the Json response
            return response.json();
        })
        .then(data => data.favourite)
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        });
}

export function addFavourite(recipe_id) {
    return fetch(`${API_URL}/favRecipe/${recipe_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response is NOT OKAY');
            }

            //return the Json response
            return response.json();
        })
        .then(isFav => ({...isFav}))
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        });
}

export function getCookBooks(){
    return fetch(`${API_URL}/cookbooks/`, { method: 'GET'})
        .then(response => {
            if(!response.ok){
                throw new Error('Network response is NOT OKAY');
            }

            //return the Json response
            return response.json();
        })
        .then(data => data.cookbooks)
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        });
}

export function addCookbook(book_name, recipeId) {
    return fetch(`${API_URL}/cookbooks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({book_name: book_name, recipeId: recipeId})
    })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response is NOT OKAY');
            }

            //return the Json response
            return response.json();
        })
        .then(data => data.cookbooks)
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        });
}

//export function addToCookbook(bookname, recipeId):

export function getBookRecipes(bookname){
    return fetch(`${API_URL}/bookRecipes/${bookname}`, { method: 'GET'})
        .then(response => {
            if(!response.ok){
                throw new Error('Network response is NOT OKAY');
            }

            //return the Json response
            return response.json();
        })
        .then(recipe => ({...recipe}))
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        });
}


export function getFavs() {
    return fetch(`${API_URL}/favourites/`, { method: 'GET'})
        .then(response => {
            if(!response.ok){
                throw new Error('Network response is NOT OKAY');
            }

            //return the Json response
            return response.json();
        })
        .then(recipe => ({...recipe}))
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        });
}
