import React, { useState } from "react";
import restaurants from "../sample-restaurants";

const Landing = (props) => {

    const [ display, setDisplay ] = useState(false);
    const [ title, setTile ] = useState('');
    const [ url, setUrl ] = useState('');

    const displayList = () => {
        setDisplay(!display);
    }

    const getTitle = restaurant => {
        const {title, url} = restaurant;
        setTile(title);
        setUrl(url);
        setDisplay(false);
    }

    const goToRestaurant = () => {
        props.history.push(`/restaurant/${url}`);
    }

    return (
        <div className='restaurant_select'>
            <div className='restaurant_select_top'>
                <div onClick={displayList}
                     className='restaurant_select_top-header font-effect-fire-animation'>{title ? title : 'Выберите ресторан'}</div>
                <div className='arrow_picker'>
                    <div className='arrow_picker-up'></div>
                    <div className='arrow_picker-down'></div>
                </div>
            </div>

            {display ? <div className='restaurant_select_bottom'>
                <ul>
                    {restaurants.map(restaurant => {
                        return <li onClick={() => getTitle(restaurant)}
                                   key={restaurant.id}>{restaurant.title}</li>
                    })}
                </ul>
            </div> : null}
            {title && !display ?
                <button onClick={goToRestaurant}>Перейти в ресторан</button> : null}
        </div>
    )
}

export default Landing;