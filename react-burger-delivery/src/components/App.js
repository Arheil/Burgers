import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";
import SignIn from "./Auth/SignIn";
import sampleBurgers from "../sample-burgers";
import firebaseApp from '../base';
import firebase from "firebase/compat";


class App extends Component {
    state ={
        burgers: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match;

        const localStorageRef = localStorage.getItem(params.restaurantId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        // this.ref = firebaseApp.syncState(`${params.restaurantId}/burgers`, {
        //     content: this,
        //     state: 'burgers'
        // })
    }

    componentDidUpdate() {
        const { params } = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        // firebaseApp.removeBinding(this.ref);
    }

    addBurger = burger => {
        const burgers = {...this.state.burgers};
        burgers[`burger${Date.now()}`] = burger;

        this.setState({ burgers })
    }

    updateBurger = (key, updatedBurger) => {
        const burgers = { ...this.state.burgers }
        burgers[key] = updatedBurger;
        this.setState({ burgers });
    }

    deleteBurger = (key) => {
        const burgers = { ...this.state.burgers }
        delete burgers[key];
        this.setState({ burgers });
    }

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    deleteFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    }

    loadSampleBurgers = () => {
        this.setState({ burgers: sampleBurgers })
    }

    handleLogOut = async () => {
        await firebase.auth().signOut();
        window.location.reload();
    }

    render() {
        return (
            <SignIn>
            <div className='burger-paradise'>
                <div className='menu'>
                    <Header title='Hot Burger' />
                    <ul className='burgers'>
                        {Object.keys(this.state.burgers).map(key => {
                            return <Burger
                                    key={key}
                                    index={key}
                                    details={this.state.burgers[key]}
                                    addToOrder={this.addToOrder}
                            />
                        })}
                    </ul>
                </div>
                <Order
                    burgers={this.state.burgers} orders={this.state.order}
                    deleteFromOrder={this.deleteFromOrder}
                />
                <MenuAdmin
                    addBurger={this.addBurger}
                    loadSampleBurgers={this.loadSampleBurgers}
                    burgers={this.state.burgers}
                    updatedBurger={this.updateBurger}
                    deleteBurger={this.deleteBurger}
                    handleLogOut={this.handleLogOut}
                />
            </div>
            </SignIn>
        )
    }
}

export default App;