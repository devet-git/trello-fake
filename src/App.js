/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import AppBar from 'components/AppBar/AppBar';
import BoardBar from 'components/BoardBar/Boardbar';
import BoardContent from 'components/BoardContent/BoardContent';
function App() {
   return (
      <div className='master'>
         <AppBar />
         <BoardBar />
         <BoardContent />
      </div>
   );
}

export default App;
