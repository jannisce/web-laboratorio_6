import './Card.css'

const Card = ({card, handleChoice, flipped}) => {

	const handleClick = () => {
		handleChoice(card)	
	}

  return (
		<div className='card'>
			<div className={flipped ? "flipped" : ""}>
					<h1 className='front'> {card.text} </h1>
					<h1 className='cover' onClick={handleClick}> ? </h1>
			</div>
		</div>		
  )
}

export default Card