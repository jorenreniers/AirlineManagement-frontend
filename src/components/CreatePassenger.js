import React, {useState } from 'react';
import "../styles/createPage.css"
import"../styles/menuButtons.css"
import {createPassenger} from '../service/PassengerService'

function CreatePassenger() {
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        age:'',
        email: '',
        phone: '',
        planeId: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleCreatePassenger = ()=>{
        createPassenger(formData)
            .then(()=> alert("Passagier aangemaakt"))
            .catch(e=> alert("Fout bij aanmaken passagier: " + e.message))
    }
    return (
        <div>
            <div className="Create-container">

                <div className="Create-form">
                    <h1>Nieuwe Passagier</h1>
                    <div className="form-group">
                        <label htmlFor="name">Naam:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
                        <label htmlFor="firstName">Voornaam:</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required/>
                        <label htmlFor="age">Leeftijd:</label>
                        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required/>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                        <label htmlFor="phone">Telefoon:</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required/>
                        <label htmlFor="planeId">Vliegtuig:</label>
                        <input type="number" id="planeId" name="planeId" value={formData.planeId} onChange={handleChange} required/>
                        <button onClick={handleCreatePassenger}>Aanmaken</button>


                    </div>


                    </div>
                </div>

        </div>
    )

} export default CreatePassenger;
