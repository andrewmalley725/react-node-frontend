import React, { useState, useEffect } from 'react';
import '../static/styles.css';
import axios from 'axios';

function getHeaders(data){
  let keys = [];
  for (let i of Object.keys(data)){
    for (let j of Object.keys(data[i])){
      if (!keys.includes(j)){
        keys.push(j);
      }
    }
  }
  return keys;
}

export default function Table(props){

    const [show, setShow] = useState(false);
    const [mydata, setData] = useState();
    
    const url = "http://localhost:3001/";
    let head = getHeaders(props.data);

    function handleClick(e,data){
        e.preventDefault();
        setShow(!show);
        setData(data);
    }

    function Modal(props){

        const [data, setData] = useState();

        useEffect(() => {
            axios.get(`${url}viewcourse?classid=${props.data}`).then(result => {
              setData(result.data['data']['0'])
            });
          }, [props.data]);

        return(
            show ? <div className="modal">
                <div onClick={() => setShow(!show)} className="overlay"></div>
                <div className="modal-content">
                    <h2>Course Info</h2>
                    <div>
                        {
                            data ? 
                            <div>
                                <p><b>Course:</b> {data['course']}</p>
                                <p><b>Instructor:</b> {data['taughtBy']}</p>
                                <p><b>Days Taught:</b> {data['schedule']}</p>
                                <p><b>Time:</b> {data['time']}</p>
                            </div>
                            : <></>
                        }
                    </div>
                    
                    <button className="close-modal" onClick={() => setShow(!show)}>
                    CLOSE
                    </button>
                </div>
        </div> : <></>
        )
    }

    return(
        <div>
            <table className='styled-table'>
                <tr>
                    {
                        head.map(header => {
                        return (
                            <th>{header}</th>
                        );
                        })
                    }
                </tr>
                {
                    Object.keys(props.data).map(key => {
                    return (
                        <tr>
                            {
                                head.map(header => {
                                return(
                                       header == 'classid' ? <a href='#' onClick={(e) => handleClick(e,props.data[key][header])}><td>{props.data[key][header]}</td></a> : <td>{props.data[key][header]}</td>
                                )
                                })
                            }
                        </tr>
                    );
                    })
                }
            </table>
            <Modal data={mydata}/>
        </div>
    )
}