import "./Column.scss";
import Card from "components/Card/Card";
import sortArr from "utilities/sort";

function Column(props) {
    const { column } = props;
    const cards = sortArr(column.cards, column.cardOrder, 'id');

    return (
        <div className='column'>
            <header>
                {column.title}
            </header>
            <ul className="card-list">
                {cards.map((card, index) => <Card key={index} card={card} />)}
            </ul>
            <footer>
                Add a card
            </footer>
        </div>
    );
}
export default Column;