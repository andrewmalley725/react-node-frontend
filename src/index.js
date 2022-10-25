import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';


function Main() {
  const url = "http://localhost:3001/";
  const [data, setData] = useState({message:''});
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [display, setVool] = useState(false);

  useEffect(() => {
    axios.get(`${url}api/?name=${name}&email=${email}`).then(result => {
      setData(result.data)
    });
  },[name, email]);

  console.log(data);
  console.log(name);
  console.log(email);

  return(
    <div>
      Enter Name: <input type='text' onKeyUp={e => setName(e.target.value)}/><br/>
      Enter Email: <input type='text' onKeyUp={e => setEmail(e.target.value)}/><br/>
      <button onClick={() => setVool(true)}>Submit</button>
      <p style={{display : display ? 'block' : 'none'}}>Server says: {data['message']}</p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Main/>
);
