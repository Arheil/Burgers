import React, { Component } from "react";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import firebase from "firebase/compat";

class MenuAdmin extends Component {
    state = {
        photo: '',
        user: ''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user })
            }
        })
    }

    authHandler = async (authData) => {
        console.log(authData)
        const { email, photoURL } = authData.user;
        this.setState({ user: email, photo: photoURL });
    }

    render() {
        const { user, photo } = this.state;
        const avatar = photo ? photo : '/images/avatar.png';

        return (
            <div className='menu-admin'>
                { user ? <div className='login-header'>
                    <div className='avatar'>
                        <img src={avatar} alt={user} />
                    </div>
                    <button onClick={this.props.handleLogOut} className='buttonLogout'>Выйти</button>
                </div> : null}
                <h2>Управление меню</h2>
                {Object.keys(this.props.burgers).map(key => {
                    return <EditBurgerForm
                        key={key}
                        index={key}
                        burger={this.props.burgers[key]}
                        updateBurger={this.props.updatedBurger}
                        deleteBurger={this.props.deleteBurger}
                    />
                })}
                <AddBurgerForm addBurger={this.props.addBurger} />
                <button onClick={this.props.loadSampleBurgers}>Загрузить бургеры</button>
            </div>
        )
    }
}

export default MenuAdmin;