import React from 'react';

function Card(props) {
    return (
        <li className="element">
            <img className="element__image" alt="Изображение" src={props.data.link} onClick={() => props.onClick(props.data)}/>
            <button type="button" className="element__delete-button"></button>
            <div className="element__info">
                <p className="element__title">{props.data.name}</p>
                <div className="element__like-container">
                    <button type="button" className="element__like-button"></button>
                    <span className='element__like-counter'>{props.data.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;