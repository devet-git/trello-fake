/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import './BoardContent.scss';
import Column from 'components/Column/Column';
import { initalData } from 'actions/initialData';
import sortArr from 'utilities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from 'utilities/dragDrop';


function BoardContent() {
   const [board, setBoard] = useState({});
   const [columns, setColumns] = useState([]);
   const onColumnDrop = (dropResult) => {
      // console.log(dropResult);
      let newColumn = [...columns];
      let newBoard = { ...board }
      newColumn = applyDrag(newColumn, dropResult);
      newBoard.columnOrder = newColumn.map(c => c.id);
      newBoard.column = newColumn;
      setColumns(newColumn);
      setBoard(newBoard);
   }
   const onCardDrop = (columnId, dropResult) => {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
         let newColumns = [...columns];
         let currentColumn = newColumns.find(c => c.id === columnId);
         currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
         currentColumn.cardOrder = currentColumn.cards.map(c => c.id);
         // console.log(columnId, dropResult);
         // console.log(currentColumn);
         // console.log(newColumns);
         setColumns(newColumns);

      }
   }

   useEffect(() => {
      // TODO: get data from DB
      const boardFromDb = initalData.boards.find(board => board.id === 'board-1');
      if (boardFromDb) {
         setBoard(boardFromDb);
         // TODO: set column after sort
         setColumns(sortArr(boardFromDb.columns, boardFromDb.columnOrder, 'id'));
      }
   }, []);

   if (isEmpty(board)) {
      return (
         <div className='not-found' style={{ 'color': 'red' }}>
            Board not found
         </div>
      );
   }

   return (
      <section className='board-contents'>
         <Container
            orientation="horizontal"
            onDrop={onColumnDrop}
            getChildPayload={index => columns[index]}
            dragHandleSelector=".column-drag-handle"
            dropPlaceholder={{
               animationDuration: 150,
               showOnTop: true,
               className: 'column-drop-preview'
            }}
         >
            {columns.map((column, index) => (
               <Draggable key={index}>
                  <Column column={column} onCardDrop={onCardDrop} />
               </Draggable>
            ))}
         </Container>
         <section className="add-column">
            <i className='fa fa-plus icon' />Add a column
         </section>
      </section>
   );
}

export default BoardContent;