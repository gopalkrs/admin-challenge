import { Route, Routes } from 'react-router-dom';
import "./styles/app.scss";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />}/>
      </Routes>
    </div>
  );
}

export default App;
