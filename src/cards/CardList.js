import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import CardForm from './CardForm'
import { addCardAction, deleteCardAction, updateCardsAction, completeCardAction } from "../cards/CardActions";
import { cardDownloadedChangeAction } from "../downloaded/DownloadedActions";
const axios = require('axios')
const _ = require('lodash')
const CardList = ({ cards, addCardAction, updateCardsAction, completeCardAction, deleteCardAction, cardDownloadedChangeAction, downloaded }, props) => {


    const getCards = async () => {
        console.log("def")
        await axios.post("http://localhost:5000/cards/reload")
        await axios.get("http://localhost:5000/cards")
        .then(async function (response) {
                console.log(response.data.allCards)
                await response.data.allCards.map(card => (addCardAction(card)))
                cardDownloadedChangeAction()
        })
    }

    const [cardsTemp, setCardsTemp] = useState(cards)

    useEffect(() => {
        setCardsTemp(cards)
    }, [cards])

    const deleteCard = (card) => {
        deleteCardAction(card)
        console.log(cards)
        setCardsTemp(cardsTemp.filter(el => el._id != card._id))
    }

    const noCards = () => {
        if (cards.length == 0) {
            return <button onClick={()=>getCards()}>Odswiez dane</button>
        }
    }

    const filterCards = (values) => {
        console.log("filtering")
        console.log(values)
        let filteredCards = cards
        if(values.company){
            filteredCards = _.filter(filteredCards, {'aib': values.company})
        }
        if (values.manu){
            filteredCards = _.filter(filteredCards, {'company': values.manu})
        }
        if (values.rgb){
            filteredCards = _.filter(filteredCards, {'rgb': true})
        }
        setCardsTemp(filteredCards)
    }

    const sortCards = (values) => {
        console.log("sorting by "+values.type)
        if(values.type === "alphabet"){
            setCardsTemp(_.sortBy(cardsTemp, ['name', 'model', 'aib']))
        }
        if(values.type === "datetime"){
            
        }
        if(values.type === "score"){
            setCardsTemp(_.sortBy(cardsTemp, ['score']))
        }
    }
    
    return (
        <div>
            <h5>Karty Graficzne</h5>
            <Link to={`/cards/add`}> Dodaj nowa karte</Link>
            <div className="Filters">
            <Formik
                initialValues={{
                    company: '',
                    manu: '',
                    rgb: '',
                }}
                onSubmit={(values) => filterCards(values)}
                enableReinitialize={true}>
                <Form>
                    Firma karty
                    <Field as="select" name="company">
                        <option value="">Wybierz firme</option>
                        {_.uniq(_.map(cards, 'aib')).map(maker => <option value={maker}>{maker}</option>)}
                    </Field>
                    Producent karty<br />
                    <div className="manu">
                        <label>
                            AMD
                            <Field type="radio" name="manu" value="AMD" />
                        </label>
                        <label>
                            Nvidia
                            <Field type="radio" name="manu" value="Nvidia" />
                        </label>
                    </div>
                    <div className="rgb">
                        <h1>Czy ma rgb?</h1>
                        <Field type="checkbox" name="rgb" />
                    </div>
                    <button type="submit">
                        Zatwierdz
                    </button>
                </Form>
            </Formik>
            </div>
            <div className="Sorting">
            <Formik
                initialValues={{
                    type: '',
                }}
                onSubmit={(values) => sortCards(values)}
                enableReinitialize={true}>
                <Form>
                    Firma prezentu
                    <Field as="select" name="type">
                        <option value="-">Wybierz sortowanie</option>
                        <option value="alphabet">Alfabetycznie</option>
                        <option value="timedate">Data wydania</option>
                        <option value="score">Wynik</option>
                    </Field>
                    <button type="submit">
                        Zatwierdz
                    </button>
                </Form>
            </Formik>
            </div>
            <div className="ItemList">
                {noCards()}
                {cardsTemp.map(card => {
                    return (
                        <div className="Item" key={card._id}>
                            <Link to={`/cards/${card._id}`}>Karta: {card.name}</Link>
                            <button onClick={() => deleteCard(card)}>Usuń</button>
                        </div>)
                })}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        downloaded: state.downloaded,
    };
}

const mapDispatchToProps = {
    updateCardsAction,
    addCardAction,
    deleteCardAction,
    completeCardAction,
    cardDownloadedChangeAction
}


export default connect(mapStateToProps, mapDispatchToProps)(CardList);