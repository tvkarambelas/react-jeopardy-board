import React, {useState, useEffect} from 'react';

function JeopardyBoard() {
  const [cluesData, setCluesData] = useState('')

  useEffect(() => {
    async function getCluesData() {
      const getCat1 = await window.fetch('http://jservice.io/api/category/?id=196')
      const cat1Data = await getCat1.json()

      const getCat2 = await window.fetch('http://jservice.io/api/category/?id=100')
      const cat2Data = await getCat2.json()

      const getCat3 = await window.fetch('http://jservice.io/api/category/?id=24')
      const cat3Data = await getCat3.json()

      const getCat4 = await window.fetch('http://jservice.io/api/category/?id=44')
      const cat4Data = await getCat4.json()

      const getCat5 = await window.fetch('http://jservice.io/api/category/?id=16694')
      const cat5Data = await getCat5.json()

      const getCat6 = await window.fetch('http://jservice.io/api/category/?id=9556')
      const cat6Data = await getCat6.json()

      setCluesData(
        [
          cat1Data,
          cat2Data,
          cat3Data,
          cat4Data,
          cat5Data,
          cat6Data
        ]
      )  
    }
    getCluesData()
  }, [])  
  
  return (
    <>
      <h1>Jeopardy!</h1>

      <div id="jeopardy-board">
        {cluesData ? 
          cluesData.map(catData => (
            <Category key={catData.id} catData={catData} />
          )) 
          : ''
        }
      </div>
    </>
  )
}

function Category({ catData }) {
  return (
    <>
      <div className="category">
        <div className="title">{catData.title}</div>

        {catData.clues.slice(0,5).map(clueData => (
          <Clue key={clueData.id} clueData={clueData} />
        ))}
      </div>
    </>
  )
}

function Clue({ clueData }) {
  return (
    <>
      <button className="clue">
        <div className="value">${clueData.value}</div>

        <div className="details">
          <div className="ques">{clueData.question}</div>
        </div>
      </button>
    </>
  )
}

export default JeopardyBoard;
