/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import './BoardContent.scss';
import Column from 'components/Column/Column';
import { initalData } from 'actions/initialData';
import sortArr from 'utilities/sort';
import { Container, Draggable } from 'react-smooth-dnd';

function BoardContent() {
   const [board, setBoard] = useState({});
   const [columns, setColumns] = useState([]);

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
   const onColumnDrop = (dropResult) => {
      console.log(dropResult);
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
                  <Column column={column} />
               </Draggable>
            ))}
         </Container>
      </section>
   );
}

export default BoardContent;