import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import './BoardContent.scss';
import Column from 'components/Column/Column';
import { initalData } from 'actions/initialData';
import sortArr from 'utilities/sort';

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
   } else
      return (
         <section className='board-contents'>
            {columns.map((column, index) => <Column key={index} column={column} />)}
         </section>
      );
}

export default BoardContent;