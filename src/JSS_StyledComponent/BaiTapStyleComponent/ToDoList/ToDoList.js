import React, { Component } from 'react'
import { Container } from '../../ComponentsToDoList/Container'
import { ThemeProvider } from 'styled-components'
import { ToDoListDarkTheme } from '../../Themes/ToDoListDarkTheme'
import { ToDoListLightTheme } from '../../Themes/ToDoListLightTheme';
import { ToDoListPrimaryTheme } from '../../Themes/ToDoListPrimaryTheme';
import { Dropdown } from '../../ComponentsToDoList/Dropdown';
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from '../../ComponentsToDoList/Heading';
import { TextField, Label, Input } from '../../ComponentsToDoList/TextField';
import { Button } from '../../ComponentsToDoList/Button';
import { Table, Tr, Td, Th, Thead, Tbody } from '../../ComponentsToDoList/Table';
import { connect } from 'react-redux';
import { addTaskAction, changeThemeAction, doneTaskAction, deleteTaskAction, editTaskAction, updateTask } from '../../../redux/actions/ToDoListActions'
import { arrTheme } from '../../../JSS_StyledComponent/Themes/ThemeManager'

class ToDoList extends Component {




    state = {
        taskName: '',
        disabled: true

    }

    renderTaskToDo = () => {
        return this.props.taskList.filter(task => !task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
                <Th className="text-right">
                    <Button onClick={() => {

                        this.setState({
                            disabled: false
                        }, () => {
                            this.props.dispatch(editTaskAction(task))
                        })

                    }} className="ml-1"><i className="fa fa-edit"></i></Button>


                    <Button onClick={() => {
                        this.props.dispatch(doneTaskAction(task.id,true))
                    }} className="ml-1"><i className="fa fa-check"></i></Button>


                    <Button onClick={() => {
                        this.props.dispatch(deleteTaskAction(task.id))
                    }} className="ml-1"><i className="fa fa-trash"></i></Button>

                </Th>
            </Tr>

        })
    }
    renderTaskCompleted = () => {
        return this.props.taskList.filter(task => task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
                <Th className="text-right">

                    <Button onClick={() => {
                        this.props.dispatch(doneTaskAction(task.id,false))
                    }} className="ml-1"><i className="fa fa-check"></i></Button>

                    <Button onClick={() => {
                        this.props.dispatch(deleteTaskAction(task.id))
                    }} className="ml-1"><i className="fa fa-trash"></i></Button>

                </Th>
            </Tr>
        })
    }

    renderTheme = () => {
        return arrTheme.map((theme, index) => {
            return <option key={index} value={theme.id}>{theme.name}</option>
        })
    }

    render() {
        return (
            <ThemeProvider theme={this.props.themeToDoList}>
                <Container className="w-50">
                    <Dropdown onChange={(e) => {
                        let { value } = e.target;
                        //Dispatch value l??n reducer

                        this.props.dispatch(changeThemeAction(value))


                    }}>
                        {this.renderTheme()}
                    </Dropdown>
                    <Heading3>To do list</Heading3>
                    <TextField value={this.state.taskName} onChange={(e) => {
                        this.setState({
                            taskName: e.target.value
                        }, () => {
                            console.log(this.state)
                        })
                    }} name="taskName" label="Task name" className="w-50" />

                    <Button onClick={() => {
                        //L???y th??ng tin ng?????i d??ng nh???p v??o t??? input
                        let { taskName } = this.state;
                        //T???o ra 1 task object
                        let newTask = {
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }
                        // console.log(newTask)
                        //????a task object l??n redux th??ng qua ph????ng th???c dispatch

                        this.props.dispatch(addTaskAction(newTask))



                    }} className="ml-2"><i className="fa fa-plus"></i> Add task</Button>
                    {
                        this.state.disabled ? <Button disabled onClick={() => {

                            this.props.dispatch(updateTask(this.state.taskName))
                        }} className="ml-2"><i className="fa fa-upload"></i> Update task</Button> :
                            <Button onClick={() => {
                                let { taskName } = this.state;
                                this.setState({
                                    disabled: true,
                                    taskName: ''
                                }, () => {
                                    this.props.dispatch(updateTask(taskName))
                                })

                            }} className="ml-2"><i className="fa fa-upload"></i> Update task</Button>

                    }

                    <hr />
                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                        </Thead>
                    </Table>
                    <Heading3>Task Completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskCompleted()}
                        </Thead>
                    </Table>
                </Container>

            </ThemeProvider>
        )
    }



    //????y l?? lifecycle tr??? v??? props c?? v?? state c?? c???a component tr?????c khi render (lifecycle n??y ch???y sau render)
    componentDidUpdate(prevProps, prevState) {

        //So s??nh n???u nh?? props tr?????c ???? (taskEdit tr?????c m?? kh??c taskEdit hi???n t???i th?? m??nh m???i setState)
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })
        }



    }



}


const mapStateToProps = state => {
    return {
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit
    }
}


export default connect(mapStateToProps)(ToDoList)




