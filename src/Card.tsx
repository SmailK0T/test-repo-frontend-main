import './styles/Card.scss';
import logo from './image/Vector.svg'
import lats from './image/Vector (1).svg'
import info from './image/01 align center (1).png'
import tg from './image/Telegram_2019_Logo.svg 1.svg'
import down from './image/button.svg'
import reight from './image/Vector (3).svg'
import bell from './image/bell.svg'
import { createEffect, createSignal } from 'solid-js';
import { debounce } from './utils/debounce';
import { updateUser } from './api/apiClient';

export const Card = (props: { userId: string, user: string, web: string, status: number }) => {
    const [isToggled, setIsToggled] = createSignal(false);
    const [isShowInfo, setShowInfo] = createSignal(false);
    const [isShowAddInfo, setShowAddInfo] = createSignal(false);
    const [isEditing, setIsEditing] = createSignal(false);
    const [userName, setUserName] = createSignal(props.user);

    const toggleSwitch = () => setIsToggled(!isToggled());
    const toggleInfo = () => setShowInfo(!isShowInfo());
    const toggleAddInfo = () => setShowAddInfo(!isShowAddInfo());

    const debouncedUpdate = debounce((newName: string) => {
        updateUser(props.userId, { name: newName })
            .then(() => console.log('User name updated successfully'))
            .catch((error) => console.error('Error updating user name:', error));
    }, 500);

    createEffect(() => {
        if (userName() !== props.user) {
            debouncedUpdate(userName());
        }
    });

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
        }
    };

    return (
        <div class="card">
            <div class="card__header">
                <div class='card__header-box'>
                    <div class='card__header-box-icon'>
                        <img src={logo} alt="" />
                    </div>
                    <span class={`card__header-box-text ${props.status === 4 ? 'pink-up' : props.status === 2 ? 'paiding' : props.status === 3 ? 'test' : ''}`}>
                        {props.status === 1 ? 'Печатаю' : props.status === 2 ? 'Ожидаю сообщений' : props.status === 3 ? 'Протестируйте меня' : 'Поключите канал'}
                    </span>
                </div>

                {props.status === 3 && (
                    <button class='card__header-button'>
                        Тестировать
                        <img src={reight} alt="" />
                    </button>
                )}
            </div>

            <div class='card__name-box'>
                {isEditing() ? (
                    <input
                        type="text"
                        value={userName()}
                        onInput={(e) => setUserName(e.currentTarget.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        class="card__name-box-input"
                        autofocus
                    />
                ) : (
                    <h2 class="card__name-box-title" onDblClick={handleDoubleClick}>
                        {userName()}
                    </h2>
                )}
                <button class={`card__name-box-button ${isShowInfo() ? 'show-info' : ''}`}
                    onClick={toggleInfo}>
                    <img src={bell} alt="" />
                </button>
            </div>


            <div class="card__stats">
                <div class="card__stats-item">
                    <p class="card__stats-item-label">Сообщений</p>
                    <p class="card__stats-item-value">289</p>
                </div>
                <div class="card__stats-item">
                    <p class="card__stats-item-label">Отработано</p>
                    <p class="card__stats-item-value">270</p>
                </div>
                <div class="card__stats-item">
                    <p class="card__stats-item-label">Эффективность</p>
                    <p class="card__stats-item-value">96%</p>
                </div>
            </div>

            <button class="card__button">
                <img src={lats} alt="" />
                Настройка чат-бота
            </button>

            <div class="card__channels">
                <div class='card__channels-info'>
                    <span class="card__channels-info-title">КАНАЛЫ</span>
                    <img class='card__channels-info-img' src={info} alt="" />
                </div>

                <div class="card__channels-item">
                    <div class="card__channels-item-info">
                        <img class='card__channels-item-info-img' src={tg} alt="" />
                        <span class="card__channels-item-info-name">Telegram</span>
                        <span class="card__channels-item-info-handle">{props.web}</span>
                    </div>
                    <div class="card__channels-item">
                        <div
                            class={`card__channels-item-toggle ${isToggled() ? 'toggled' : ''}`}
                            onClick={toggleSwitch}
                        >
                            <div class={`card__channels-item-toggle-circle ${isToggled() ? 'onSwitch' : ''}`}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card__details">
                <button class='card__details-button'
                    onClick={toggleAddInfo}>
                    <span class='card__details-button-text'>Детали</span>
                    <img class={`${isShowAddInfo() ? 'card__details-button-img' : 'card__details-button-img-off'}`} src={down} alt="" />
                </button>
            </div>
        </div>
    )
}