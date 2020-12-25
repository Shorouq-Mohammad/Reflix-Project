import React, { Component } from 'react'
import Item from './Item'

export default class CatalogSection extends Component {
    rentMovie = (id, result) => {
        this.props.rentMovie(id , result )
    }
    render() {
        return (
            <div>
               <h3>{this.props.header}:</h3>
                    <div className="items">
                        {this.props.items.map(c => <Item item={c} key={c.id} rentMovie={this.rentMovie} />)}
                </div>
            </div>
        )
    }
}
