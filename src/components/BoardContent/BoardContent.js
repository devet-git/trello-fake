/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { isEmpty } from 'lodash';
import './BoardContent.scss';
import Column from 'components/Column/Column';
import { initalData } from 'actions/initialData';
import sortArr from 'utilities/sort';
import { applyDrag } from 'utilities/dragDrop';

function BoardContent() {
   const [board, setBoard] = useState({});
   const [columns, setColumns] = useState([]);
   const [addColumnState, setAddColumnState] = useState(false);
   const [newColumnTitle, setNewColumnTitle] = useState('');
   const newColumnInpRef = useRef(null);

   // TODO: LifeCycle
   useEffect(() => {
      const boardFromDb = initalData.boards.find(board => board.id === 'board-1');
      if (boardFromDb) {
         setBoard(boardFromDb);
         setColumns(sortArr(boardFromDb.columns, boardFromDb.columnOrder, 'id'));
      }
   }, []);
   useEffect(() => {
      if (newColumnInpRef && newColumnInpRef.current) {
         newColumnInpRef.current.focus();
         newColumnInpRef.current.select();
      }
   }, [addColumnState]);

   // TODO: NOT FOUND VIEW
   if (isEmpty(board)) {
      return (
         <div className='not-found' style={{ 'color': 'red' }}>
            Board not found
         </div>
      );
   }

   // TODO: FUNCTIONS
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
   /**
   * Set state to toggle 'Add column workspace'
   */
   const toggleAddColumn = () => {
      setAddColumnState(!addColumnState);
   }
   const addColumn = () => {
      if (!newColumnTitle) {
         newColumnInpRef.current.focus();
      } else {
         let newColumns = [...columns];
         let newBoard = { ...board };
         const newColumnToAdd = {
            id: Math.random().toString(36).substring(2, 5),
            boardId: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: []
         }
         newColumns.push(newColumnToAdd);
         newBoard.columnOrder = newColumns.map(column => column.id);
         newBoard.columns = newColumns;
         setColumns(newColumns);
         setBoard(newBoard);
         setNewColumnTitle('');
         // setAddColumnState(false);
      }
   }
   const onUpdateColumn = (columnToUpdate) => {
      const { id } = columnToUpdate;
      let newColumns = [...columns];
      let newBoard = { ...board };
      const columnIndexToUpdate = newColumns.findIndex(i => i.id === id);
      columnToUpdate._detroy ? newColumns.splice(columnIndexToUpdate, 1) : newColumns.splice(columnIndexToUpdate, 1, columnToUpdate)
      newBoard.columnOrder = newColumns.map(column => column.id);
      newBoard.columns = newColumns;
      setColumns(newColumns);
      setBoard(newBoard);
   }
   // TODO: RENDER
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
                  <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
               </Draggable>
            ))}
         </Container>
         <section className='add-column'>
            {!addColumnState &&
               <div className="add-column-btn" onClick={toggleAddColumn}>
                  <i className='fa fa-plus icon' />Add a column
               </div>
            }
            {addColumnState &&
               <div className='add-column-main'>
                  <input
                     type="text"
                     name='columnTitle'
                     className='inp-column-title'
                     placeholder="Enter list title"
                     ref={newColumnInpRef}
                     value={newColumnTitle}
                     onInput={e => setNewColumnTitle(e.target.value)}
                     onKeyDown={e => (e.key === 'Enter') && addColumn()}
                  />
                  <button className='mybtn apply-column-title' onClick={addColumn}>Add column</button>
                  <button className='mybtn close' onClick={toggleAddColumn}><i className='fa fa-close' /></button>
               </div>
            }
         </section>
      </section>
   );
}

export default BoardContent;