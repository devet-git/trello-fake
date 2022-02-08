import './BoardContent.scss';
import Column from 'components/Column/Column';


function BoardContent() {
    return (
        <section className='board-contents'>
            <Column />
            <Column />
        </section>
    );
}

export default BoardContent;