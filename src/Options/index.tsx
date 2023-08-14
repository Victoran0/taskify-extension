import React, {useState} from 'react';
import './index.css';
import InputField from '../Components/InputField'
import { Todo } from 'model';
import TodoList from '../Components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


export const Options: React.FC  = () => {
    const [todo, setTodo] = useState<string>("")
    const [todos, setTodos] = useState<Todo[]>([])
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault();
        if (todo) {
            setTodos([...todos, {id: Date.now(), todo, isDone: false}])
            setTodo('')
        }
    }

    const onDragEnd = (result: DropResult) => {
        console.log(result);
        const {source, destination} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        let add,
        active = todos,
        complete = completedTodos;

        if (source.droppableId ==='TodosList') {
            add = active[source.index];
            active.splice(source.index, 1)
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        if (destination.droppableId === 'TodosList') {
            active.splice(destination.index, 0, add)
        } else {
            complete.splice(destination.index, 0, add)
        }

        setCompletedTodos(complete);
        setTodos(active);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">Taskify</span>
                <InputField 
                    todo={todo}
                    setTodo={setTodo}
                    handleAdd={handleAdd}
                />
                <TodoList 
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                />
            </div>
        </DragDropContext>
    )
}