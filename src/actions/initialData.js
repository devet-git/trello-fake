export const initalData = {
   boards: [
      {
         id: 'board-1',
         columnOrder: ['column-2', 'column-3', 'column-1'],
         columns: [
            {
               id: 'column-1', boardId: 'board-1', title: 'TO DO COLUMN',
               cardOrder: ['card-2', 'card-1', 'card-3', 'card-4'],
               cards: [
                  {
                     id: 'card-1', boardId: 'board-1', columnId: 'column-1',
                     title: 'Card\'s title 1',
                     cover: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/WOPA160517_D056-resized.jpg?crop=864,0,1728,2304&wid=600&hei=800&scl=2.88'
                  },
                  {
                     id: 'card-2', boardId: 'board-1', columnId: 'column-1',
                     title: 'Card\'s title 2',
                     cover: null
                  },
                  {
                     id: 'card-3', boardId: 'board-1', columnId: 'column-1',
                     title: 'Card\'s title 3',
                     cover: null
                  },
                  {
                     id: 'card-4', boardId: 'board-1', columnId: 'column-1',
                     title: 'Card\'s title 4',
                     cover: null
                  }
               ]
            },
            {
               id: 'column-2', boardId: 'board-1', title: 'HAHA COLUMN',
               cardOrder: ['card-5', 'card-6', 'card-7'],
               cards: [
                  {
                     id: 'card-5', boardId: 'board-1', columnId: 'column-2',
                     title: 'Card\'s title 5',
                     cover: null
                  },
                  {
                     id: 'card-6', boardId: 'board-1', columnId: 'column-2',
                     title: 'Card\'s title 6',
                     cover: null
                  },
                  {
                     id: 'card-7', boardId: 'board-1', columnId: 'column-2',
                     title: 'Card\'s title 7',
                     cover: null
                  }
               ]
            },
            {
               id: 'column-3', boardId: 'board-1', title: 'HOHO COLUMN',
               cardOrder: ['card-8', 'card-9'],
               cards: [
                  {
                     id: 'card-8', boardId: 'board-1', columnId: 'column-3',
                     title: 'Card\'s title 8',
                     cover: null
                  },
                  {
                     id: 'card-9', boardId: 'board-1', columnId: 'column-3',
                     title: 'Card\'s title 9',
                     cover: null
                  }
               ]
            }
         ]
      }
   ]
}