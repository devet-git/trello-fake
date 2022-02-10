/* eslint-disable react/react-in-jsx-scope */
import './Column.scss';
import Card from 'components/Card/Card';
import sortArr from 'utilities/sort';
import { Container, Draggable } from 'react-smooth-dnd';

function Column(props) {
   const { column } = props;
   const cards = sortArr(column.cards, column.cardOrder, 'id');
   const onCardDrop = (dropResult) => {
      console.log(dropResult);
   }
   return (
      <div className='column'>
         <header className='column-drag-handle'>
            {column.title}
         </header>
         <div className="card-list">
            <Container
               // onDragStart={e => console.log('drag started', e)}
               // onDragEnd={e => console.log('drag end', e)}
               // onDragEnter={() => console.log('drag enter:', column.id)}
               // onDragLeave={() => console.log('drag leave:', column.id)}
               // onDropReady={p => console.log('Drop ready: ', p)}
               groupName="col"
               onDrop={onCardDrop}
               getChildPayload={index => cards[index]}
               dragClass="card-ghost"
               dropClass="card-ghost-drop"
               dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'card-drop-preview'
               }}
               dropPlaceholderAnimationDuration={200}
            >
               {cards.map((card, index) => (
                  <Draggable key={index}>
                     <Card card={card} />
                  </Draggable>
               ))}
            </Container>
         </div>
         <footer>
            Add a card
         </footer>
      </div>
   );
}
export default Column;