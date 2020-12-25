import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Item extends Component {
    checked = (event) => { 
        this.props.rentMovie(event.target.id ,event.target.checked)
    }
    render() {
        const item = this.props.item
        return (
            <div className="item">
                <label className="checkbox-label">
                    <input type="checkbox" name="movie" id={item.id} checked={item.isRented} onChange={this.checked} className="checkbox" />
                </label>
                <Link to={`/movies/${item.id}`}>
                    <img src={item.img} alt="movie img" />
                </Link>
            </div>
        )
    }
}
