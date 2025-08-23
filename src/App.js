// JavaScript
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PassengerList from './components/PassengerList';
import Navbar from './navbar/Navbar';
import CreatePassenger from './components/CreatePassenger';

function App() {
    return (


        <BrowserRouter>
            <Navbar />
            <main className="app-main">
                <Routes>
                    <Route path="/passengers" element={<PassengerList />} />
                    <Route path="/createpassenger" element={<CreatePassenger/>}/>
                </Routes>
            </main>
        </BrowserRouter>

    );
}

export default App;