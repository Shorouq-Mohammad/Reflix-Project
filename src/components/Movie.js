import React, { Component } from 'react'

export default class Movie extends Component {
    render() {
        const {movie} = this.props
        return (
            <div id="movie">
               <h1>{movie.title} ({movie.year})</h1> 
               <img src={movie.img} alt="movie img"/>
               <p>{movie.descrShort}</p>
            </div>
        )
    }
}
