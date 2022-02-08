import './Card.scss';

function Card(props) {
   const { card } = props;
   return (
      <li className="card-item">
         {card.cover && <img src={card.cover} alt="ihi" />}
         {card.title}
      </li>
   );
}
export default Card;