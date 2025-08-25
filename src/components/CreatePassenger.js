// JavaScript
import React, { useState } from "react";
import "../styles/createPage.css";
import "../styles/menuButtons.css";
import "../styles/ReUseButtons.css";
import { useNavigate, Link } from "react-router-dom";
import { createPassenger } from "../service/PassengerService";

function CreatePassenger() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        phoneNumber: "",
        planeId: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((f) => ({ ...f, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.firstName || !formData.lastName || !formData.email) {
            setError("Voornaam, achternaam en e-mail zijn verplicht.");
            return;
        }

        try {
            setSubmitting(true);
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber || null,
                age: formData.age !== "" ? Number(formData.age) : null,
                planeId: formData.planeId !== "" ? Number(formData.planeId) : null,
            };
            await createPassenger(payload);
            navigate("/passengers");
        } catch (e2) {
            setError("Fout bij aanmaken passagier. Probeer het opnieuw.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="page page-create">
            <header className="page-header">
                <h1 className="page-title">Nieuwe Passagier</h1>
                <p className="page-subtitle">
                    Vul de gegevens in en koppel optioneel een vliegtuig.
                </p>
            </header>

            {error && <div className="alert alert-danger">{error}</div>}

            <section className="card">
                <form className="card-body form-grid" onSubmit={onSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="firstName" className="field-label">Voornaam</label>
                        <input
                            id="firstName"
                            name="firstName"
                            className="field-control"
                            value={formData.firstName}
                            onChange={onChange}
                            placeholder="Bijv. Sam"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="lastName" className="field-label">Achternaam</label>
                        <input
                            id="lastName"
                            name="lastName"
                            className="field-control"
                            value={formData.lastName}
                            onChange={onChange}
                            placeholder="Bijv. Jansen"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="email" className="field-label">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="field-control"
                            value={formData.email}
                            onChange={onChange}
                            placeholder="naam@voorbeeld.nl"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="phoneNumber" className="field-label">Telefoon</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            className="field-control"
                            value={formData.phoneNumber}
                            onChange={onChange}
                            placeholder="+31 6 12345678"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="age" className="field-label">Leeftijd</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            min="0"
                            className="field-control"
                            value={formData.age}
                            onChange={onChange}
                            placeholder="Bijv. 27"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="planeId" className="field-label">Vliegtuig (ID)</label>
                        <input
                            id="planeId"
                            name="planeId"
                            type="number"
                            min="0"
                            className="field-control"
                            value={formData.planeId}
                            onChange={onChange}
                            placeholder="Bijv. 42"
                        />
                        <div className="field-hint">Koppel aan een bestaand vliegtuig-ID.</div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? "Aanmaken…" : "Aanmaken"}
                        </button>
                        <Link className="btn btn-secondary" to="/passengers">
                            Annuleren
                        </Link>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default CreatePassenger;