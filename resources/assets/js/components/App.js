import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    // handle SUBMIT
    handleSubmit(e) {
        e.preventDefault();

        Axios.post('/tasks', {
            name: this.state.name,
        }).then((response) => {
            //console.log('form response: ', response);
            this.setState({
                tasks: [response.data, ...this.state.tasks],
                name: ''
            })
        });
    }

    // render TASKS
    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <div>
                        {task.name}
                        <small className="text-muted">
                            <br />
                            by {task.user.name} | {task.updated_at.split(' ').slice(1).join('')}
                        </small>

                        <div className="btn-group pull-right">
                            <Link className='btn btn-sm btn-info' to={`/${task.id}/edit`}>Update</Link>
                            <button onClick={() => this.handleDelete(task.id)} className='btn btn-sm btn-danger'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    // Get DATA FROM DATABASE
    getTasks() {
        Axios.get('/tasks').then(response => {
            this.setState({
                tasks: [...response.data.tasks]
            })
        })
    }

    // handle DELETE
    handleDelete(id) {
        // remove from local state
        const isNotId = task => task.id !== id;
        const updatedTasks = this.state.tasks.filter(isNotId);
        this.setState({ tasks: updatedTasks })

        // make delete request to the backend!
        Axios.delete(`/tasks/${id}`);
    }

    componentWillMount() {
        this.getTasks();
    }

    render() {
        const state = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Task Create</div>

                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={state.name}
                                            maxLength='255'
                                            className='form-control'
                                            rows='5'
                                            placeholder='Create a new task'
                                            required />
                                    </div>
                                    <button type='submit' className='btn btn-primary'>Create Task</button>
                                </form>
                                <hr />

                                {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;