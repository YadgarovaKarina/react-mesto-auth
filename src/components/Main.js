import React from 'react';
import Card from './Card';
import profileAvatar from '../images/__avatar.png';
import { api } from '../utils/api';

const Main = (props) => {
    const {cards, onCardClick} = props;
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState(profileAvatar);

    React.useEffect(() => {
        api.getUserInfo().then(profile => {
            setUserName(profile.name);
            setUserDescription(profile.about);
            setUserAvatar(profile.avatar);
        })
        .catch((err) => {
            console.log(err);
          })
    }, []);
   
    return (
        <div className="content">
            <section className="profile">
                <div className='profile__avatar-change'>
                    <img className="profile__avatar" src={userAvatar} alt='Аватар' />
                    <button type="button" className="profile__avatar-button" onClick={props.onAvatarClick}></button>
                </div>
                <div className="profile__content">
                    <div className="profile__info">
                        <h1 className="profile__author">{userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfileClick}></button>
                    </div>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onNewPlaceClick}></button>
            </section>
            <ul className="elements">
                {cards.map((card) => <Card key={card._id} data={card} onClick={onCardClick}/>)};
            </ul>
        </div>
    );
}

export default Main;

