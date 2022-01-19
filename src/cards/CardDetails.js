import { useEffect } from "react";
import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { editCardAction } from "./CardActions";

const CardDetails = ({ card, history, editCardAction }, props) => {

    const checkRgb = () => {
        if (card.rgb == true) {
            return "Card bedzie sie swiecil jak tecza"
        }
        else return "Card bedzie elegancki bez swiatelek"
    }

    const handleSubmit = (values) => {
        editCardAction(values);
        history.push(`/cards/${card.id}`);
    }

    return (

        <div>
            <h5>Konfiguracja przedmiotu w paczce</h5>
            <div>
                <div className="details"> 
                <div>Firma: {card.company}</div>
                <div>Nazwa karty: {card.name}</div>
                <div>Seria: {card.series}</div>
                <div>Data wydania: {card.releaseDate}</div>
                <div>Architektura: {card.architecture}</div>
                <div>Wynik: {card.score}</div>
            </div>

                
            </div>
        </div>
    )
};


const mapStateToProps = (state, props) => ({
    card: state.cards.find(card => card._id == props.match.params.id)
});

const mapDispatchToProps = {
    editCardAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardDetails));

/*
<h5>Edycja</h5>
                <Formik
                    initialValues={{
                        id: card.id,
                        name: card.name,
                        receiver: card.receiver,
                        company: card.company,
                        manu: card.manu,
                        rgb: card.rgb,
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    enableReinitialize={true}>
                    <Form>
                        Nazwa cardu
                        <Field name="name" /><br />
                        Kto otrzyma card
                        <Field name="receiver" /><br />
                        Firma cardu
                        <Field as="select" name="company">
                            <option value="msi">MSI</option>
                            <option value="gigabyte">Gigabyte</option>
                            <option value="asus">Asus</option>
                        </Field>
                        Producent cardu<br />
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
*/