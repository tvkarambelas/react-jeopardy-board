import React, {useState, useEffect} from 'react';

function JeopardyBoard() {
  const [cluesData, setCluesData] = useState('')
  const [activeClue, setActiveClue] = useState('')

  useEffect(() => {
    async function getCluesData() {
      const getCat1 = await window.fetch('http://jservice.io/api/category/?id=50')
      const cat1Data = await getCat1.json()

      const getCat2 = await window.fetch('http://jservice.io/api/category/?id=100')
      const cat2Data = await getCat2.json()

      const getCat3 = await window.fetch('http://jservice.io/api/category/?id=125')
      const cat3Data = await getCat3.json()

      const getCat4 = await window.fetch('http://jservice.io/api/category/?id=44')
      const cat4Data = await getCat4.json()

      const getCat5 = await window.fetch('http://jservice.io/api/category/?id=175')
      const cat5Data = await getCat5.json()

      const getCat6 = await window.fetch('http://jservice.io/api/category/?id=200')
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

  function handleActiveClue(e, clueData) {
    e.preventDefault();
    setActiveClue(clueData);
  }
  
  return (
    <>
      <h1>Jeopardy!</h1>

      <div id="board-container">
        <div id="board">
          {cluesData ? 
            cluesData.map(catData => (
              <div key={catData.id} className="category">
                <div className="title">{catData.title}</div>

                {catData.clues.slice(0,5).map(clueData => (
                  <Clue key={clueData.id} clueData={clueData} handleActiveClue={handleActiveClue} />
                ))}
              </div>
            )) 
            : ''
          }
        </div>

        <ActiveClue clueData={activeClue} handleActiveClue={handleActiveClue} />
      </div>  
    </>
  )
}

function Clue({ clueData, handleActiveClue }) {
  const [clueSelected, setClueSelected] = useState(false)

  function activateClue(e) {
    e.preventDefault();
    setClueSelected(true)
    handleActiveClue(e,clueData)
  }

  return (
    <>
      <button className="clue" disabled={clueSelected} onClick={e => activateClue(e,clueData)}>
        <div className="value">${clueData.value}</div>

        <div className="details">
          <div className="ques">{clueData.question}</div>
        </div>
      </button>
    </>
  )
}

function ActiveClue({clueData, handleActiveClue}) {
  const [clueState, setClueState] = useState('question')

  function closeClue(e) {
    e.preventDefault();
    setClueState('question')
    handleActiveClue(e,null)
  }

  return (
    <>
      {clueData ?
        <div id="active-clue-container">
          <div id="active-clue">
            {clueState === 'question' ?
              <>
                <div className="clue">{clueData.question}</div>
                <button onClick={e => setClueState('answer')}>Show Answer</button>
              </>
              :
              <>
                <div className="answer">{clueData.answer}</div>
                <button onClick={e => setClueState('question')}>Show Clue</button>
              </>
            }
                        
            <button onClick={e => closeClue(e)}>Close</button>
          </div>
        </div>
        : ''
      }
    </>
  )
}

export default JeopardyBoard;
