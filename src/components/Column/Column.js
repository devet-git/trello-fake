/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown } from 'react-bootstrap'

import './Column.scss';
import Card from 'components/Card/Card';
import ConfirmModal from 'components/common/ConfirmModal';
import sortArr from 'utilities/sort';
import { MODAL_CONFIRM } from 'utilities/constants';

function Column(props) {
   const { column, onCardDrop, onUpdateColumn } = props;
   const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
   const [isTitleEditAble, setIsTitleEditAble] = useState(false);
   const [columnTitle, setColumnTitle] = useState('');
   const cards = sortArr(column.cards, column.cardOrder, 'id');
   const toggleConfirmModal = () => setIsConfirmModalShow(!isConfirmModalShow);
   const onModalActions = (type) => {
      if (type == MODAL_CONFIRM) {
         const newColumn = {
            ...column,
            _detroy: true
         }
         onUpdateColumn(newColumn);
      }
      toggleConfirmModal();
   }
   const onEditColumnTitleBlur = () => {
      const newColumn = {
         ...column,
         title: columnTitle
      }
      onUpdateColumn(newColumn);
   }
   const columnTitleStyle = {
      display: 'block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
   }
   useEffect(() => {
      setColumnTitle(column.title)
   }, [column.title])

   return (
      <div className='column'>
         <header className='column-drag-handle'>
            <div className="column-title">
               {
                  isTitleEditAble ?
                     (
                        <input
                           type="text"
                           name='renameCoumn'
                           value={columnTitle}
                           className="content-editable"
                           onBlur={onEditColumnTitleBlur, (e) => e.target.value !== '' ? (setIsTitleEditAble(false), onEditColumnTitleBlur()) : e.target.focus()}
                           onChange={(e) => setColumnTitle(e.target.value)}
                           onKeyPress={(e) => (e.key == 'Enter' && e.target.value !== '') && (setIsTitleEditAble(false), onEditColumnTitleBlur())}
                           autoFocus
                        />
                     ) :
                     (
                        <span title={columnTitle} style={columnTitleStyle} onDoubleClick={() => setIsTitleEditAble(true)}>
                           {columnTitle}
                        </span>
                     )
               }
            </div>
            <div className="column-dropdown-actions">
               <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" title='Option' />
                  <Dropdown.Menu className="dropdown-menu">
                     <Dropdown.Item className="dropdown-item">Add card</Dropdown.Item>
                     <Dropdown.Item className="dropdown-item" onClick={toggleConfirmModal}>Remove column</Dropdown.Item>
                     <Dropdown.Item className="dropdown-item">Remove all in this column</Dropdown.Item>
                     <Dropdown.Item className="dropdown-item">Archive all in this column</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </div>
         </header >
         <div className="card-list">
            <Container
               // onDragStart={e => console.log('drag started', e)}
               // onDragEnd={e => console.log('drag end', e)}
               // onDragEnter={() => console.log('drag enter:', column.id)}
               // onDragLeave={() => console.log('drag leave:', column.id)}
               // onDropReady={p => console.log('Drop ready: ', p)}
               groupName="col"
               onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
            <div className="footer-actions">
               <i className='fa fa-plus icon' />Add a card
            </div>
         </footer>
         <ConfirmModal
            title="Remove column"
            content={`Are you sure remove the <strong>${column.title}</strong> column?`}
            show={isConfirmModalShow}
            onAction={onModalActions}
         />
      </div >
   );
}
export default Column;
