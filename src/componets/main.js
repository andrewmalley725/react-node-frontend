import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './table';

export default function Main() {
    const url = "http://localhost:3001/";
    const [data, setData] = useState();
    const[value, setValue] = useState();
    const [categories, setCats] = useState();
    const [selection, setSel] = useState();
    const [sched, setSched] = useState();
  
    useEffect(() => {
      axios.get(`${url}classes/?value=${value}`).then(result => {
        setData(result.data['data']);
      });
    }, [value]);

    useEffect(() => {
      axios.get(`${url}dropdown`).then(result => {
        setCats(result.data['data'])
      });
    }, []);

    useEffect(() => {
      axios.get(`${url}info?class=${selection}`).then(result => {
        setSched(result.data['data']);
      });
    }, [selection]);

    console.log(sched);
  
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
        <select style={{display: value ? 'block' : 'none'}} onChange={e=>setSel(e.target.value)}>
            {
              value ? data ? data.length > 0 ? data.map(i => {
                return(
                  <option value={i}>{i}</option>
                )
              }) : <option>No classes offered</option> : <option></option> : <option></option>
            }
        </select>
        {
          sched ? <Table data={sched}/> : <></>
        }
      </div>
    )
  }