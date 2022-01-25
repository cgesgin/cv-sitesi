import React, { Component } from 'react';
import userService from '../services/user.service';
import EventBus from "../common/EventBus";

import AuthService from "../services/auth.service";
import eventBus from '../common/EventBus';

class CreateCVComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            name: '',
            surname: '',
            email: '',
            phone: '',
            education: '',
            skill: '',
            user_id: '',
            experience: '',
            workplace: '',
            des:''
        };

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeSkillHandler = this.changeSkillHandler.bind(this);
        this.changeEducationHandler = this.changeEducationHandler.bind(this);
        this.changeExperienceHandler=this.changeExperienceHandler.bind(this);
        this.changeWorkplaceHandler=this.changeWorkplaceHandler.bind(this);
       
        this.changeDesHandler=this.changeDesHandler.bind(this);
        this.save = this.save.bind(this);
    }


    save(e) {
        e.preventDefault();
        let user = AuthService.getCurrentUser();
        let cv = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            phone: this.state.phone,
            education: this.state.education,
            skill: this.state.skill,
            user_id: user.id,
            experience: this.state.experience,
            workplace: this.state.workplace,
            description:this.state.des
           
        };
        userService.create(cv).then(
            response => {
                this.props.history.push('myResume/' + user.id);
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
                    EventBus.dispatch("logout");
                }
            }
        );
        console.log('cv=>' + JSON.stringify(cv));
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
    changeExperienceHandler = (event) => {
        this.setState({ experience: event.target.value });
    }
    
    changeWorkplaceHandler = (event) => {
        this.setState({ workplace: event.target.value });
    }

    changeDesHandler = (event) => {
        this.setState({ des: event.target.value });
    }
  
    

    render() {
        return (
            <div>
                <div className="card col-md-8 offset-md-3 border-3" >
                    <h3 className="text-center">Create CV </h3>
                    <div className="card-body">

                        <form>
                            <div className="card col-md-6 offset-md-3">
                                <label class="fw-bold fs-5">name</label>
                                <input name="name" value={this.state.name}
                                    onChange={this.changeNameHandler}
                                    type="text" class="form-control" />
                            </div>
                            <div className="card col-md-6 offset-md-3">
                                <label class="fw-bold fs-5">Surname</label>
                                <input name="surname" value={this.state.surname}
                                    onChange={this.changeSurnameHandler}
                                    type="text" class="form-control" />
                            </div>
                            <div className="card col-md-6 offset-md-3">
                                <label class="fw-bold fs-5">Email</label>
                                <input name="email" value={this.state.email}
                                    onChange={this.changeEmailHandler}
                                    type="text" class="form-control" />

                            </div>
                            <div className="card col-md-6 offset-md-3">
                                <label class="fw-bold fs-5">Phone</label>
                                <input name="phone" value={this.state.phone}
                                    onChange={this.changePhoneHandler}
                                    type="text" class="form-control" />
                            </div>
                            <div className="card col-md-6 offset-md-3">
                                <label class="fw-bold fs-5">Education</label>
                                <input name="education" value={this.state.education}
                                    onChange={this.changeEducationHandler}
                                    type="text" class="form-control" />
                            </div>
                            <div className="card col-md-6 offset-md-3">
                                <label class="fw-bold fs-5">Skill</label>
                                <input name="skill" value={this.state.skill}
                                    onChange={this.changeSkillHandler}
                                    type="text" class="form-control" />
                            </div>

                            <div className="card col-md-7 offset-md-3 border-3" >
                            <div className="card-body">
                            <h3 className="text-center"> Experience </h3>
                                <div className="card col-md-12 offset-md-3">
                                    <label class="fw-bold fs-5">work experience</label>
                                    <input name="experience" value={this.state.experience}
                                        onChange={this.changeExperienceHandler}
                                        type="text" class="form-control" />
                                </div>

                                <div className="card col-md-12 offset-md-3">
                                    <label class="fw-bold fs-5">Workplace</label>
                                    <input name="workplace" value={this.state.workplace}
                                        onChange={this.changeWorkplaceHandler}
                                        type="text" class="form-control" />
                                </div>

                                <div className="card col-md-12 offset-md-3">
                                    <label class="fw-bold fs-5">Description</label>
                                    <input name="description" value={this.state.des}
                                        onChange={this.changeDesHandler}
                                        type="text" class="form-control" />
                                </div>
                            </div>
                            </div>
                            <div class="form-group row">
                                <button name="submit" type="submit" onClick={this.save} class="btn btn-primary">create </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCVComponent;