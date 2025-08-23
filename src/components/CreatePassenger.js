import React, {useEffect, useState } from 'react';
import "../styles/createPage.css"
import"../styles/menuButtons.css"
import {createPassenger} from '../services/PassengerService'

function AddPassenger() {
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        age:'',
        email: '',
        phone: '',
        planeId: ''
    })
    return (
        <div>

        </div>
    )
}
