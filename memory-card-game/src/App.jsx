import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card'

const images = [
  {'text': '🚀'},
  {'text': '👽'},
  {'text': '☄️'},
  {'text': '🪐'},
  {'text': '🌌'},
  {'text': '🌠'},
  {'text': '🌟'},
  {'text': '🌎'}
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, isFlipped: false, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns( turns + 1)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.text === choiceTwo.text && choiceOne.id !== choiceTwo.id) {
        console.log('match')
        setCards(cards.map((card) => {
          if (card.id === choiceOne.id || card.id === choiceTwo.id) {
            return {...card, isFlipped: true}
          }
          return card
        }))
        resetTurn()
      } else {
        console.log('no match')
        setTimeout(() => { resetTurn() }, 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  return (
    <div className="App">
        <h1 className='title'> Memory Card Game </h1>
        <button onClick={shuffleCards}> New Game! </button>
        <div className="cards">
          {cards.map((card) => (
            <Card
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.isFlipped} 
            />
          ))}
        </div>

        <h1>Movimientos: {turns} </h1>
        
    </div>
  )
}

export default App