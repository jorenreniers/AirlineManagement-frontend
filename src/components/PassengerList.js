// JavaScript
import React, { useEffect, useState } from "react";
import "../styles/Pagelist.css";
import "../styles/menuButtons.css";
import { Link } from "react-router-dom";
import { getAllPassengers } from "../service/PassengerService";
import { getAllPlanes } from "../service/PlaneService"; // nieuw

function PassengerList() {
    const [passengers, setPassengers] = useState([]);
    const [planeNames, setPlaneNames] = useState({}); // { [planeId]: codeName }
    const [nameQuery, setNameQuery] = useState("");
    const [emailQuery, setEmailQuery] = useState("");

    const displayName = (p) =>
        p?.name ||
        [p?.firstName ?? p?.firstname, p?.lastName ?? p?.lastname]
            .filter(Boolean)
            .join(" ") ||
        "Onbekend";

    const getFirstName = (p) =>
        p?.firstName ?? p?.firstname ?? (p?.name ? p.name.split(" ")[0] : "");

    const getEmail = (p) => p?.email ?? "-";
    const getPhone = (p) => p?.phoneNumber ?? p?.phone ?? p?.tel ?? "-";

    const getAirplaneText = (p) => {
        if (p?.planeId != null) {
            return planeNames[p.planeId] ?? `#${p.planeId}`;
        }
        return "-";
    };

    useEffect(() => {
        const load = async () => {
            try {
                const [pRes, plRes] = await Promise.all([getAllPassengers(), getAllPlanes()]);

                const pData = Array.isArray(pRes?.data) ? pRes.data : [];
                const sorted = [...pData].sort((a, b) =>
                    displayName(a).localeCompare(displayName(b), "nl", { sensitivity: "base" })
                );
                setPassengers(sorted);

                const planes = Array.isArray(plRes?.data) ? plRes.data : [];
                const map = {};
                for (const pl of planes) {
                    if (pl?.id != null && pl?.codeName) map[pl.id] = pl.codeName;
                }
                setPlaneNames(map);
            } catch (e) {
                console.error("Laden mislukt:", e);
                setPassengers([]);
                setPlaneNames({});
            }
        };
        load();
    }, []);

    const filtered = passengers.filter((p) => {
        const name = displayName(p).toLowerCase();
        const email = (p?.email ?? "").toLowerCase();
        return (
            (!nameQuery || name.includes(nameQuery.toLowerCase())) &&
            (!emailQuery || email.includes(emailQuery.toLowerCase()))
        );
    });

    return (
        <div>
            <div className="header-container">
                <h1 className="title">Onze Passagiers</h1>
            </div>

            <div className="search-bar-wrapper">
                <input
                    type="text"
                    value={nameQuery}
                    onChange={(e) => setNameQuery(e.target.value)}
                    placeholder="Zoek op naam"
                    className="search-input"
                />
                <input
                    type="text"
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                    placeholder="Zoek op e-mail"
                    className="search-input"
                />
            </div>

            <div className="entity-page">
                <table className="entity-table">
                    <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Voornaam</th>
                        <th>E-mail</th>
                        <th>Telefoon</th>
                        <th>Vliegtuig</th>
                        <th>Acties</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.length ? (
                        filtered.map((p, i) => (
                            <tr key={p?.id ?? `p-${i}`}>
                                <td>{displayName(p)}</td>
                                <td>{getFirstName(p) || "-"}</td>
                                <td>{getEmail(p)}</td>
                                <td>{getPhone(p)}</td>
                                <td>{getAirplaneText(p)}</td>
                                <td>
                                    <Link to={`/passengers/${p?.id}`} className="edit-button">
                                        Details
                                    </Link>
                                    <Link to={`/passengers/${p?.id}/edit`} className="edit-button">
                                        Bewerk
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center" }}>
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