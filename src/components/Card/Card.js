/* eslint-disable react/react-in-jsx-scope */
import './Card.scss';

function Card(props) {
   const { card } = props;
   return (
      <div className="card-item">
         {card.cover && <img src={card.cover} alt="ihi" onMouseDown={e => e.preventDefault()} />}
         {card.title}
      </div>
   );
}
export default Card;