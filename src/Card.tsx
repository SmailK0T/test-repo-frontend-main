import './styles/Card.scss';
import logo from './image/Vector.svg'
import lats from './image/Vector (1).svg'
import info from './image/01 align center (1).png'
import tg from './image/Telegram_2019_Logo.svg 1.svg'
import down from './image/button.svg'
import { createSignal } from 'solid-js';

export const Card = (props: { user: number }) => {
    const [isToggled, setIsToggled] = createSignal(false);

    const toggleSwitch = () => setIsToggled(!isToggled());

    return (
        <div class="card">
            <div class="card__header">
                <div class="card__header-icon">
                    <img src={logo} alt="" />
                </div>
                <span class="card__header-text">Печатаю</span>
            </div>

            <h2 class="card__title">Бот для продаж</h2>

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
                    <p class="card__stats-item-label">Эффективно</p>
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
                        <span class="card__channels-item-info-handle">{props.user}</span>
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
                <button class='card__details-button'>
                    <span class='card__details-button-text'>Детали</span>
                    <img src={down} alt="" />
                </button>
            </div>
        </div>
    )
}