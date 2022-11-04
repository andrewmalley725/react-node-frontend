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
    const [data, setData] = useState();
    const[value, setValue] = useState('');
    const [categories, setCats] = useState()
  
    useEffect(() => {
      axios.get(`${url}search/?value=${value}`).then(result => {
        setData(result.data);
      });
    }, [value]);

    useEffect(() => {
      axios.get(`${url}dropdown`).then(result => {
        setCats(result.data['data'])
      });
    }, []);

    console.log(data);
    console.log(value);
    console.log(categories);
  
    return(
      <div>
        <select onChange={e => setValue(e.target.value)}>
        <option value={''}>Select a subject</option>
          {
            categories ? categories.map(i => {
              return(
                <option value={i}>{i}</option>
              ) 
            }) : <option></option>
          }
        </select>
        <br/>
        {
          data ? data['data'].length > 0 ? <Table data={data['data']}/> : 
          <p>No classes currently offered</p> :
          <p>select a class subject</p>
        }
      </div>
    )
  }