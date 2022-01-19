import { Field, Form, Formik } from "formik"
import { useEffect } from "react";
import { addProducentAction } from "../producents/ProducentActions";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from "react-router";
const axios = require('axios')

const ProducentForm = ({ history, addProducentAction }, props) => {
    useEffect(() => {
        console.log(props.producents);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const producentToAdd = await axios.post("http://localhost:5000/producents", values)
            console.log("123")
            console.log(producentToAdd.data)
            addProducentAction(producentToAdd.data);
        }
        catch(err){
            console.log(err)
        }
        
        history.push(`/producents`);
    }

    return (
        <div>
            <h3>Karta</h3>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    address: '',
                    country: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}>
                <Form>
                    Nazwa firmy
                    <Field name="name" /><br />
                    Telefon firmy
                    <Field name="phone" /><br />
                    Adres firmy
                    <Field name="address" /><br />
                    <button type="submit">
                        Zatwierdz
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        producents: state.producents
    }
};

const mapDispatchToProps = {
    addProducentAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducentForm));