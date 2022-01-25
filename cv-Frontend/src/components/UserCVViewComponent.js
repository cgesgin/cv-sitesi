import React, { Component } from 'react';
import eventBus from '../common/EventBus';
import userService from '../services/user.service';

class UserCVViewComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            cv: {},
            content: "",
        };
    }
    componentDidMount() {
        userService.getCVByUserId(this.state.id).then(
            response => {
                this.setState({ cv: response.data });
            },
            error => {
              this.setState({
                content:
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString()
              });
      
              if (error.response && error.response.status === 401) {
                eventBus.dispatch("logout");
              }
            }
          ); 
    }
    gotoUpdate(id){
        this.props.history.push('/update/'+id);
    }
    cancel(){
         this.props.history.push('/create');
    }
   

    deleteResume(id){
        userService.deleteResume(id).then( res => {
            
        this.props.history.push('/create');
        });

    }

    render() {
        return (
            <div>
                <br></br>

                <div className="card col-md-7 offset-md-3 border-3" >
                    <h3 className="text-center"> CV Details</h3>
                    <div className="card-body">

                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5">name</label>
                            <input name="email" className="form-control" value={this.state.cv.name} readOnly />
                        </div>
                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5">Surname</label>
                            <input name="email" className="form-control" value={this.state.cv.surname} readOnly />
                        </div>

                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5">Email</label>
                            <input name="email" className="form-control" value={this.state.cv.email} readOnly />
                        </div>
                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5">Phone</label>
                            <input name="email" className="form-control" value={this.state.cv.phone} readOnly />
                        </div>
                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5">education</label>
                            <input name="email" className="form-control" value={this.state.cv.education} readOnly />
                        </div>
                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5"> Skill: </label>
                            <input name="email" className="form-control" value={this.state.cv.skill} readOnly />
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => this.gotoUpdate(this.state.id)}  class="btn btn-success">update</button>
                        <button onClick={() => this.deleteResume(this.state.cv.id)}  class="btn btn-danger">delete</button>
                        <button onClick={() => this.cancel()}  class="btn btn-info">cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}
}

export default UserCVViewComponent;