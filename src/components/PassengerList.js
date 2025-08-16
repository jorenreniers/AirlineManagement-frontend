// JavaScript
import React, { useEffect, useState } from "react";
import "../styles/Pagelist.css"
import "../styles/menuButtons.css";
import { Link } from "react-router-dom";
import { getAllPassengers } from "../service/PassengerService";

function PassengerList() {
    const [passengers, setPassengers] = useState([]);
    const [nameQuery, setNameQuery] = useState("");
    const [emailQuery, setEmailQuery] = useState("");

    useEffect(() => {
        let mounted = true;
        getAllPassengers()
            .then((res) => {
                const data = Array.isArray(res?.data) ? res.data : [];
                const sorted = [...data].sort((a, b) => {
                    const aName =
                        a?.name ||
                        [a?.lastName, a?.firstName].filter(Boolean).join(", ") ||
                        "";
                    const bName =
                        b?.name ||
                        [b?.lastName, b?.firstName].filter(Boolean).join(", ") ||
                        "";
                    return aName.localeCompare(bName, "nl", { sensitivity: "base" });
                });
                if (mounted) setPassengers(sorted);
            })
            .catch((err) => {
                console.error("Kon passagiers niet laden:", err);
                if (mounted) setPassengers([]);
            });
        return () => {
            mounted = false;
        };
    }, []);

    const displayName = (p) =>
        p?.name || [p?.firstName, p?.lastName].filter(Boolean).join(" ") || "Onbekend";

    const filtered = passengers.filter((p) => {
        const name = displayName(p).toLowerCase();
        const email = (p?.email || "").toLowerCase();
        const nameOk = !nameQuery || name.includes(nameQuery.toLowerCase());
        const emailOk = !emailQuery || email.includes(emailQuery.toLowerCase());
        return nameOk && emailOk;
    });

    // Knoppen zijn optioneel; filtering gebeurt al live via inputs
    const handleSearchByName = () => {};
    const handleSearchByEmail = () => {};

    return (
        <div>
            <div className="header-container">
                <h1 className="title">Onze Passagiers</h1>
            </div>

            <div className="search-bar-wrapper">
                <div className="search-bar">
                    <input
                        type="text"
                        value={nameQuery}
                        onChange={(e) => setNameQuery(e.target.value)}
                        placeholder="Zoek op naam"
                        className="search-input"
                    />
                    <button onClick={handleSearchByName} className="search-button">
                        Zoek op naam
                    </button>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        value={emailQuery}
                        onChange={(e) => setEmailQuery(e.target.value)}
                        placeholder="Zoek op e-mail"
                        className="search-input"
                    />
                    <button onClick={handleSearchByEmail} className="search-button">
                        Zoek op e-mail
                    </button>
                </div>
            </div>

            <div className="entity-page">
                <table className="entity-table">
                    <thead>
                    <tr>
                        <th>Naam</th>
                        <th>E-mail</th>
                        <th>Telefoon</th>
                        <th>Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((p, idx) => (
                        <tr key={p?.id ?? `p-${idx}`}>
                            <td>{displayName(p)}</td>
                            <td>{p?.email || "-"}</td>
                            <td>{p?.phone || "-"}</td>
                            <td>
                                <Link to={`/passengers/${p?.id}`} className="edit-button">
                                    Details
                                </Link>
                                <Link to={`/passengers/${p?.id}/edit`} className="edit-button">
                                    Bewerk
                                </Link>
                            </td>
                        </tr>
                    ))}
                    {!filtered.length && (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center" }}>
                                Geen passagiers gevonden.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PassengerList;