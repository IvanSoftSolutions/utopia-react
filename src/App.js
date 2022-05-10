import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Usuarios from './services/Usuarios';

function App() {

  var values = [10, 1000, 50, 0, 100]

  const [user, setUser] = useState(1);
  const [result, setResult] = useState(0);
  const [userLog, setUserLog] = useState(null);
  const [stock, setStock] = useState(400);
  const usuario = {
    UName: 'ivan2',
    pass: 'pass2'
  }

  useEffect(() => {
    if (stock < 100) {
      alert('Low Stock');
    }
  }, [stock])

  function login() {
    Usuarios.create(usuario).then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
  }

  function changeUser() {
    setUser(user + 1);
  }

  function applyBtn(value) {
    setResult((value * 2) / 5);
    setStock(stock - 20);
    setUserLog(user);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Example
        </h1>
        <h2>User {user}</h2>
        <h3>Stock {stock}</h3>
        <button onClick={login} >Login</button>
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Aux1</td>
              <td>{values[0]}</td>
              <td><button onClick={() => applyBtn(values[0])}>Apply</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Aux2</td>
              <td>{values[1]}</td>
              <td><button onClick={() => applyBtn(values[1])}>Apply</button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Aux3</td>
              <td>{values[2]}</td>
              <td><button onClick={() => applyBtn(values[2])}>Apply</button></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Aux4</td>
              <td>{values[3]}</td>
              <td><button onClick={() => applyBtn(values[3])}>Apply</button></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Aux5</td>
              <td>{values[4]}</td>
              <td><button onClick={() => applyBtn(values[4])}>Apply</button></td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>Result</th>
              <th>User</th>
            </tr>
            <tr>
              <td>{result}</td>
              <td>{userLog}</td>
            </tr>
          </tbody>
        </table>
      </header>
      <div>
        <button onClick={changeUser}>Change User</button>
      </div>
    </div>
  );
}

export default App;
