import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Movie from './components/Movie'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      catalog: [
          { id: 0, isRented: false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
          { id: 1, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
          { id: 2, isRented: false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
          { id: 3, isRented: false, title: "The Sword in the Stone", year: 1963, img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
          { id: 4, isRented: false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
        ],
      users: localStorage.usersReflix ? JSON.parse(localStorage.usersReflix) : {
        0: {name: "Guest", rented: [], budget: 0, img:"https://img.russelloliver.co.uk/270-_-406-_-70-_-cdn.clipart.email/d7ede620146207af8cd0210331c23545_hip-human-behavior-sleeve-silhouette-png-download-32004809-_3200-4809.png"},
        1: {name: "Sheldon", rented: [], budget: 10, img:"https://res.cloudinary.com/dbuhagj9e/image/upload/v1608927064/7gjkfigguqchh044f32p15gv90-21eb879a1eb05cb977ade0d80dee314c_xhg8cs.png"},
        2: {name: "Leonard", rented: [], budget: 10, img:"https://res.cloudinary.com/dbuhagj9e/image/upload/v1608927070/johnny-galecki-leonard-hofstadter-the-big-bang-theory-penny-sheldon-cooper-the-big-bang-theory-6bb4c4401b8c02aeca9cee4c1d6c0e32_zyixa9.png"},
        3: {name: "Penny", rented: [], budget: 10, img:"https://www.novelties-direct.co.uk/images/P/SC620.jpg"}
      },
      currentUserID: localStorage.currentUserIDReflix || 0
    }
  }

  rentMovie = (movieID, result) =>{
    const user = this.state.users[this.state.currentUserID]
    const isRentedIndex = user.rented.findIndex(t => t.id == movieID)
    const newBudget = result ? user.budget - 3 : user.budget + 3
    const tempRented = [...user.rented]
    if(isRentedIndex === -1 && newBudget >= 0 && result){
      const movie = {...this.state.catalog.find(t => t.id == movieID)}
      movie.isRented = result
      tempRented.push(movie)
    }else if(! result && isRentedIndex >= 0){
      tempRented.splice(isRentedIndex, 1)
    }else if(newBudget < 0){
      return alert("you don't have enough money")
    }else{
      return alert("you have already rented this movie")
    }
    const users = {...this.state.users}
    users[this.state.currentUserID].rented = tempRented
    users[this.state.currentUserID].budget = newBudget
    this.setState({
        users: users
    })
    localStorage.usersReflix = JSON.stringify(users) 
  }

  changeUser=(userId)=>{
    this.setState({currentUserID: userId})
    localStorage.currentUserIDReflix = userId
  }

  render() {
  const state = this.state
  return (
    <Router> 
      <div className="App">
        <div id="main-links">
          <ul id="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to={`/catalog/${state.currentUserID}`}>Catalog</Link></li>
            <li id="logoLi"><a className="logoA" href="/"><img id="logo" src="https://res.cloudinary.com/dbuhagj9e/image/upload/v1608837326/5fe4e7db56219_z1gnmb.png" alt="logo"/></a></li>
            <li id="budget">{state.users[state.currentUserID].budget}$</li>
            <li id="user">{state.users[state.currentUserID].name}</li>
          </ul>      
        </div>
        <Switch>
          <Route exact path="/" render={() => <Home users={Object.values(state.users)} changeUser = {this.changeUser}/>}/>
          <Route exact path="/catalog/:id" render={({ match }) => <Catalog match={match} catalog={state.catalog} rented={state.users[match.params.id].rented} rentMovie={this.rentMovie} />} />
          <Route path="/movies/:movieID" exact render={({ match }) => <Movie match={match} movie={state.catalog.find(c => c.id == match.params.movieID)}/>}/>
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Router>
    );
  }
}
