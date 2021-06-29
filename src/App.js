import React, { Component, useEffect, useState } from "react"
import "./App.css";
const axios = require('axios').default;

const App = () => {
  const url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

  const [tableData, updateTableData] = useState([])
  const [searchText, updateSearchText] = useState("")
  const [detailData, updateDetailData] = useState({})
  const [sourceData, updateSourceData]= useState([])

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        console.log(res.data)
        updateSourceData(res.data)
        updateTableData(res.data)
      })
  }, [])

  useEffect(() => {
    console.log(searchText)
    if(searchText === ""){
      updateTableData(sourceData)
    } else {
      let filteredData = sourceData.filter((eachTableData) => {
        return (eachTableData.firstName.toLowerCase().includes(searchText.toLowerCase()) || eachTableData.lastName.toLowerCase().includes(searchText.toLowerCase()))
      })
      updateTableData(filteredData)
    }
  }, [searchText])

  return (
    <>
      <div id="overlay">
        <img src="./preloader.gif" alt="Preloader icon" />
      </div>
      <main>
        <div id="table-section">
          <form action="/">
            <input type="text" placeholder="Enter something" name="search-box" id="search-box" value={searchText} onChange={(e) => { updateSearchText(e.target.value) }} />
          </form>
        </div>

        <div id="table-wrapper">
          <div id="table-headers">
            <table>
              <thead>
                <tr>
                  <th className="column1">Id</th>
                  <th className="column2">FirstName</th>
                  <th className="column3">LastName</th>
                  <th className="column4">Email</th>
                  <th className="column5">Phone</th>
                </tr>
              </thead>
            </table>
          </div>

          <div id="table-data">
            <table>
              <tbody>
                {
                  tableData && tableData.length > 0 && tableData.map((eachRow, _index) => {
                    return (
                      <React.Fragment key={_index}>
                        <tr className={detailData.id == eachRow.id ? 'data-row active': 'data-row'}  onClick={() => updateDetailData(eachRow)}>
                          <td className="column1">{eachRow.id}</td>
                          <td className="column2">{eachRow.firstName}</td>
                          <td className="column3">{eachRow.lastName}</td>
                          <td className="column4">{eachRow.email}</td>
                          <td className="column5">{eachRow.phone}</td>
                        </tr>
                      </React.Fragment>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </div>


        <div id="info-wrapper">
          <h1>Details</h1>
          <p>Click on a table item to get detailed information</p>
          {
            detailData && Object.keys(detailData).length > 0 ? <div id="info-content">
              <div><b>User selected:</b> {detailData.firstName} {detailData.lastName}</div>
              <div>
                <b>Description: </b>
                <textarea cols="50" rows="5" readOnly value={detailData.description}>
                </textarea> 
              </div>
              <div><b>Address:</b> {detailData.address.streetAddress} </div>
              <div><b>City:</b> {detailData.address.city}</div>
              <div><b>State:</b> {detailData.address.state}</div>
              <div><b>Zip:</b> {detailData.address.zip}</div>
            </div> : null
          }

        </div>

      </main>

    </>
  )
}

export default App