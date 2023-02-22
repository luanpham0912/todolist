import { ToDoListDarkTheme } from "../../JSS_StyledComponent/Themes/ToDoListDarkTheme"
import { add_task, change_theme, delete_task, done_task, edit_task, update_task } from "../types/ToDoListTypes"
import { arrTheme } from '../../JSS_StyledComponent/Themes/ThemeManager'

const initialState = {
    themeToDoList: ToDoListDarkTheme,
    taskList: [
        // { id: 'task-1', taskName: 'task 1', done: true },
        // { id: 'task-2', taskName: 'task 2', done: false },
        // { id: 'task-3', taskName: 'task 3', done: true },
        // { id: 'task-4', taskName: 'task 4', done: false },

    ],
    taskEdit: { id: '-1', taskName: '', done: false },

}



export const ToDoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case add_task: {

            if (action.newTask.taskName.trim() === '') {
                alert('Task name is required!');
                return { ...state }
            }

            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName);
            if (index !== -1) {
                alert('task name already exists !');
                return { ...state };
            }

            taskListUpdate.push(action.newTask);

            //Xử lý xong thì gán taskList mới vào taskList
            state.taskList = taskListUpdate;

            return { ...state }
        }
        case change_theme: {
            //Tìm theme dựa vào action.themeId được chọn
            let theme = arrTheme.find(theme => theme.id == action.themeId);
            if (theme) {
                console.log(theme);
                //set Lại theme cho state.themeToDoList
                state.themeToDoList = { ...theme.theme };
            }

            return { ...state };
        }
        case done_task: {


            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === action.taskId);
            if (index !== -1) {
                taskListUpdate[index].done = action.flag;
            }

            state.taskList = taskListUpdate;
            return { ...state, taskList: taskListUpdate }
        }

        case delete_task: {
            // let taskListUpdate = [...state.taskList];
            // taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId);

            // return {...state,taskList:taskListUpdate}

            return { ...state, taskList: state.taskList.filter(task => task.id !== action.taskId) }
        }

        case edit_task: {
            return { ...state, taskEdit: action.task }
        }

        case update_task: {
            // console.log(action.taskName)
            state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

      
            let taskListUpdate = [...state.taskList];

            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);


            if (index !== -1) {
                taskListUpdate[index] = state.taskEdit;
            }

            state.taskList = taskListUpdate;
            state.taskEdit = { id: '-1', taskName: '', done: false }

            return { ...state }
        }

        default:
            return { ...state }
    }
}
