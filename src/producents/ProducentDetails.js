import { useEffect } from "react";
import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { editProducentAction } from "./ProducentActions";

const ProducentDetails = ({ producent, history, editProducentAction }, props) => {

    const checkRgb = () => {
        if (producent.rgb == true) {
            return "Producent bedzie sie swiecil jak tecza"
        }
        else return "Producent bedzie elegancki bez swiatelek"
    }

    const handleSubmit = (values) => {
        editProducentAction(values);
        history.push(`/producents/${producent.id}`);
    }

    return (

        <div>
            <h5>Konfiguracja przedmiotu w paczce</h5>
            <div>
                <div className="details"> 
                <div>Firma: {producent.name}</div>
                <div>Nazwa karty: {producent.phone}</div>
                <div>Seria: {producent.address}</div>
                <div>Data wydania: {producent.country}</div>
                <div>Wydaje karty dla: {producent.supports}</div>
            </div>

                
            </div>
        </div>
    )
};


const mapStateToProps = (state, props) => ({
    producent: state.producents.find(producent => producent._id == props.match.params.id)
});

const mapDispatchToProps = {
    editProducentAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducentDetails));

/*
<h5>Edycja</h5>
                <Formik
                    initialValues={{
                        id: producent.id,
                        name: producent.name,
                        receiver: producent.receiver,
                        company: producent.company,
                        manu: producent.manu,
                        rgb: producent.rgb,
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    enableReinitialize={true}>
                    <Form>
                        Nazwa producentu
                        <Field name="name" /><br />
                        Kto otrzyma producent
                        <Field name="receiver" /><br />
                        Firma producentu
                        <Field as="select" name="company">
                            <option value="msi">MSI</option>
                            <option value="gigabyte">Gigabyte</option>
                            <option value="asus">Asus</option>
                        </Field>
                        Producent producentu<br />
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