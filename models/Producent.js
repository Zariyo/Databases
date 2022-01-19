const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const producentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        require: true,
    },
    country: {
        type: String,
    },
    supports:{
        type: Array,
    }
});

module.exports = model('Producent', producentSchema);


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