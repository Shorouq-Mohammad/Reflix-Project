import React, { Component } from 'react'
import CatalogSection from './CatalogSection'

export default class Catalog extends Component {
    constructor(){
        super()
        this.state={
            searchTerm: "",
        }
    }
    rentMovie = (id, result ) =>{
        this.props.rentMovie(id, result)
    }
    handleSearch = (event) =>{
        this.setState({searchTerm : event.target.value})
    }
    dynamicSearch = (array) => {
        return array.filter(r => r.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }
    render() {
        const rented = this.dynamicSearch(this.props.rented) || this.props.rented 
        const catalog = this.dynamicSearch(this.props.catalog) || this.props.catalog
        return (
            <div id="catalog">
                <input type="text" value={this.state.searchTerm} onChange={this.handleSearch} id="input" placeholder="Search a Movie"/>
                {rented.length ? <CatalogSection items={rented} header="Rented" rentMovie={this.rentMovie} />  : null}
                <CatalogSection items={catalog} header="Catalog" rentMovie={this.rentMovie} />
            </div>
        )
    }
}
