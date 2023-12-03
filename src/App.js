import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Recipe from './components/Recipe';
import Login from './components/Login';
import Register from './components/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App(){
    return (
        <div>
          <Router>
              <Navbar/>
              <Routes>
                  <Route index element={<Search />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/recipe/:recipeId" element={<Recipe />} />
              </Routes>
          </Router>
      </div>
    );
}

export default App;
