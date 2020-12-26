import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Home extends Component {
    changeUser = (event) => {
        this.props.changeUser(event.target.id)
    }
    render() {
        const users = this.props.users
        return (
            <div id="users">
                {users.map((u,i)=> { 
                    return (
                            <Link to={`/catalog/${i}`} key={i}>
                                <div className="user" onClick={this.changeUser} id={i}>
                                    <p id={i}>{u.name}</p>
                                    <img src={u.img} alt="img" id={i}/>
                                </div>
                            </Link>
                            )
                        }
                )}
            </div>
        )
    }
}
