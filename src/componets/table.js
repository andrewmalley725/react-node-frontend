import React from 'react';

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
    
    let head = getHeaders(props.data);

    return(
        <div>
            <table>
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
                                    <td>{props.data[key][header]}</td>
                                )
                                })
                            }
                        </tr>
                    );
                    })
                }
            </table>
        </div>
    )
}