const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const cardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    series: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    architecture:{
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    aib:{
        type: String,
        required: true,
    },
    model:{
        type: String,
        required: true,
    },
    score:{
        type: Number,
        required: true,
    },
    imageurl:{
        type: String,
    }
});

module.exports = model('Card', cardSchema);


/*Firma cardu
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
*/

/*
<div>Firma robiaca card: {card.company}</div>
<div>Tworca czesci cardu: {card.manu}</div>
<div>Czy ma rgb? {checkRgb()}</div>
*/