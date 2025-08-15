import { Link } from 'react-router-dom';
import { getAllPassengers } from '../service/PassengerService';
import { useEffect, useRef, useState } from 'react';

function PassengerList() {
    const [passengers, setPassengers] = useState([]);
    const didFetch = useRef(false); // voorkomt dubbel uitvoeren in StrictMode

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;

        let cancelled = false;

        getAllPassengers()
            .then(response => {
                const data = Array.isArray(response.data) ? response.data : response;
                if (cancelled) return;
                const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name)); // kopie + sort
                setPassengers(sorted);
                console.log(sorted);
            })
            .catch(error => {
                if (!cancelled) console.error(error);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div>
            <h1>Passenger List</h1>
            <Link to="/passenger/add">Add Passenger</Link>
            <ul>
                {passengers.map(p => (
                    <li key={p.id}>{p.firstName} {p.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default PassengerList;