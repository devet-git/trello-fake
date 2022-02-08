import "./Column.scss";
import Task from "components/Task/Task";
function Column() {
    return (
        <div className='column'>
            <header>
                Name
            </header>
            <ul className="task-list">
                <Task />
            </ul>
            <footer>
                Add a card
            </footer>
        </div>
    );
}
export default Column;