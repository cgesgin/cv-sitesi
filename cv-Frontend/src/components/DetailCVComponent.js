import React, { Component } from 'react';
import userService from '../services/user.service';

class DetailCVComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            cv: {},
            content: "",
        };
    }

    componentDidMount() {
        userService.getCVById(this.state.id).then(res => {
            this.setState({ cv: res.data });
        });
    }

    cancel(){
         this.props.history.push('/list');
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
                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5">work experience: </label>
                            <input name="email" className="form-control" value={this.state.cv.experience} readOnly />
                        </div>
                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5"> workplace: </label>
                            <input name="email" className="form-control" value={this.state.cv.workplace} readOnly />
                        </div>
                        <div className="card col-md-8 offset-md-3">
                            <label class="fw-bold fs-5">work description: </label>
                            <input name="email" className="form-control" value={this.state.cv.description} readOnly />
                        </div>                        

                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <button onClick={() => this.cancel()}  class="btn btn-danger">cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailCVComponent;