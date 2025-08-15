import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PassengerList from './components/PassengerList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/passengers" element={<PassengerList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
