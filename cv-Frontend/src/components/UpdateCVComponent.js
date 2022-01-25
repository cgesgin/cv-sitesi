import React, { Component } from 'react';
import eventBus from '../common/EventBus';
import userService from '../services/user.service';

class UpdateCVComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            content: "",
            name: '',
            surname: '',
            email: '',
            phone: '',
            education: '',
            skill: '',
            user_id: '',
            cv_id: ''
        };
        // this.changeNameHandler = this.changeNameHandler.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        userService.getCVByUserId(this.state.id).then(
            response => {
                let temp = response.data;
                this.setState({
                    name: temp.name,
                    surname: temp.surname,
                    email: temp.email,
                    phone: temp.phone,
                    education: temp.education,
                    skill: temp.skill,
                    user_id: temp.user_id,
                    cv_id: temp.id
                });
            }
        );
    }


    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changeSurnameHandler = (event) => {
        this.setState({ surname: event.target.value });
    }
    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    changePhoneHandler = (event) => {
        this.setState({ phone: event.target.value });
    }

    changeEducationHandler = (event) => {
        this.setState({ education: event.target.value });
    }
    changeSkillHandler = (event) => {
        this.setState({ skill: event.target.value });
    }

    update(e) {
        e.preventDefault();
        let cv = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            phone: this.state.phone,
            education: this.state.education,
            skill: this.state.skill,
            user_id: this.state.user_id
        };


        userService.update(cv, this.state.cv_id).then(
            response => {
                this.props.history.push('/myResume/' + this.state.user_id);
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

        console.log('cv=>' + JSON.stringify(cv));
    }
    cancel() {
        this.props.history.push('/myResume/'+this.state.id);
    }
    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3 border-3" >
                    <h3 className="text-center"> Update CV </h3>
                    <div className="card-body">

                        <div className="card col-md-6 offset-md-3">
                            <label class="fw-bold fs-5">name</label>
                            <input placeholder="First Name" name="name" className="form-control"
                                value={this.state.name} onChange={this.changeNameHandler} />
                        </div>

                        <div className="card col-md-6 offset-md-3">
                            <label class="fw-bold fs-5">Surname</label>
                            <input placeholder="Surname" name="surname" className="form-control"
                                value={this.state.surname} onChange={this.changeSurnameHandler} />
                        </div>

                        <div className="card col-md-6 offset-md-3">
                            <label class="fw-bold fs-5">Email</label>
                            <input placeholder="Email" name="email" className="form-control"
                                value={this.state.email} onChange={this.changeEmailHandler} />
                        </div>

                        <div className="card col-md-6 offset-md-3">
                            <label class="fw-bold fs-5">Phone</label>
                            <input placeholder="Phone" name="phone" className="form-control"
                                value={this.state.phone} onChange={this.changePhoneHandler} />
                        </div>

                        <div className="card col-md-6 offset-md-3">
                            <label class="fw-bold fs-5">Education</label>
                            <input placeholder="Education" name="education" className="form-control"
                                value={this.state.education} onChange={this.changeEducationHandler} />
                        </div>
                        <div className="card col-md-6 offset-md-3">
                            <label class="fw-bold fs-5">Skill</label>
                            <input placeholder="Skill" name="skill" className="form-control"
                                value={this.state.skill} onChange={this.changeSkillHandler} />
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={this.update}>Save</button>
                    <button onClick={() => this.cancel()} class="btn btn-info">cancel</button>
                </div>
            </div>
        );
    }
}

export default UpdateCVComponent;