import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import ProducentForm from '../producents/ProducentForm'
import { addProducentAction, deleteProducentAction, updateProducentsAction, completeProducentAction } from "../producents/ProducentActions";
import { producentDownloadedChangeAction } from "../downloaded/DownloadedActions";
const axios = require('axios')
const _ = require('lodash')
const Producents = ({ producents, addProducentAction, updateProducentsAction, completeProducentAction, deleteProducentAction, producentDownloadedChangeAction, downloaded }, props) => { 


    const getProducents = async () => {
        console.log("def")
        await axios.post("http://localhost:5000/producents/reload")
        await axios.get("http://localhost:5000/producents")
        .then(async function (response) {
                console.log(response.data.allProducents)
                await response.data.allProducents.map(producent => (addProducentAction(producent)))
                producentDownloadedChangeAction()
        })
    }   

    const [producentsTemp, setProducentsTemp] = useState(producents)

    useEffect(() => {
        setProducentsTemp(producents)
    }, [producents])

    const deleteProducent = (producent) => {
        deleteProducentAction(producent)
        console.log(producents)
        setProducentsTemp(producentsTemp.filter(el => el._id != producent._id))
    }

    const noProducents = () => {
        if (producents.length == 0) {
            return <button onClick={()=>getProducents()}>Odswiez dane</button>
        }
    }

    const filterProducents = (values) => {
        console.log("filtering")
        console.log(values)
        let filteredProducents = producents
        if(values.country){
            filteredProducents = _.filter(filteredProducents, {'country': values.country})
        }
        if(values.supports){
            filteredProducents = _.filter(filteredProducents, {'supports': values.supports})
        }
        setProducentsTemp(filteredProducents)
    }

    const sortProducents = (values) => {
        console.log("sorting by "+values.type)
        if(values.type === "alphabet"){
            setProducentsTemp(_.sortBy(producentsTemp, ['name', 'model', 'aib']))
        }
        if(values.type === "datetime"){
            
        }
        if(values.type === "score"){
            setProducentsTemp(_.sortBy(producentsTemp, ['score']))
        }
    }

    return (
        <div>
            <h5>Producenci</h5>
            <Link to={`/producents/add`}> Dodaj nowego producenta</Link>
            {noProducents()}

            <Formik
                initialValues={{
                    country: ''
                }}
                onSubmit={(values) => filterProducents(values)}
                enableReinitialize={true}>
                <Form>
                    Kraj firmy
                    <Field as="select" name="country">
                        <option value="">Wybierz kraj</option>
                        {_.uniq(_.map(producents, 'country')).map(maker => <option value={maker}>{maker}</option>)}
                    </Field>
                    Tworzy karty dla:
                    <div className="supports">
                        AMD
                    <Field type="checkbox" name="supports" value="amd"/>
                    Nvidia
                    <Field type="checkbox" name="supports" value="nvidia"/>
                    </div>
                    <button type="submit">
                        Zatwierdz
                    </button>
                </Form>
            </Formik>
            
            {producentsTemp.map(producent => {
    return (
        <div className="Item" key={producent._id}>
            <Link to={`/producents/details/${producent.name}`}>Producent: {producent.name}</Link>
            <button onClick={() => deleteProducent(producent)}>Usuń</button>
        </div>)
})}

            <div className="ItemList">
                {console.log("123")}
                {console.log(producents)}
            
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        producents: state.producents,
        downloaded: state.downloaded,
    };
}

const mapDispatchToProps = {
    updateProducentsAction,
    addProducentAction,
    deleteProducentAction,
    completeProducentAction,
    producentDownloadedChangeAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Producents);

/*
{producents.map(producent => {
    return (
        <div className="Item" key={producent.name}>
            <Link to={`/producents/${producent.name}`}>Producent: {producent.name}</Link>
            <button onClick={() => deleteProducentAction(producent)}>Usuń</button>
        </div>)
})}
*/