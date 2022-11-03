import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './table';

function getSubjects(data){
    let subjects = [];
    for (let i of Object.keys(data)){
        let subject = data[i]['Subject'];
        if (!subjects.includes(subject)){
            subjects.push(subject);
        }
    }
    return subjects;
}

export default function Main() {
    const url = "http://localhost:3001/";
    const [data, setData] = useState({data:''});
    const[search, setSearch] = useState('');
    const[value, setValue] = useState('');
  
    useEffect(() => {
      axios.get(`${url}search/?value=${value}`).then(result => {
        setData(result.data);
      });
    }, [value]);

    console.log(search);
    console.log(data);
    console.log(value);
  
    return(
      <div>
        <Table data={data['data']}/>
      <br/>
      Search <input type="text" onKeyUp={e => setSearch(e.target.value)}/>&nbsp;<button onClick={() => {setValue(search)}}>Submit</button><br/>
      </div>
    )
  }