import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class TaskEdit extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         task: []
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e) {
      this.setState({
         name: e.target.value
      })
   }

   // handle SUBMIT
   handleSubmit(e) {
      e.preventDefault();

      const history = this.props.history;

      Axios.put(`/tasks/${this.props.match.params.id}`, {
         name: this.state.name,
      }).then((response) => {
         //console.log('form response: ', response);
         if (history.action) {
            this.props.history.goBack();
         } else {
            history.push('/home')
         }
      });
   }

   // Get DATA FROM DATABASE
   getTasks() {
      Axios.get(`/tasks/${this.props.match.params.id}/edit`).then(response => {
         console.log(response)
         this.setState({
            task: response.data.task,
            name: response.data.task.name
         })
      })
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
                     <div className="panel-heading">Edit Task</div>

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
                           <button type='button' className='btn btn-danger' onClick={() => this.props.history.goBack()}>Back</button>
                           <button type='submit' className='btn btn-primary'>Update Task</button>
                        </form>
                        <hr />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default TaskEdit;