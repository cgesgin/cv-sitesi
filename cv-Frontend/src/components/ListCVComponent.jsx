import React, { Component } from 'react';


import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


class ListCVComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          content: "",
          cv:[]
        };
      }


      componentDidMount() {
        UserService.getCVlist().then(
          response => {
            this.setState({
              cv: response.data
            });
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
      }

      cvDetail(id){
        this.props.history.push(`/detail/${id}`);
       
    }


    render() {
      
        return (
            <div>
            <h2 className='text-center'>CV List</h2>
            <div className='row'>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th> NAME</th>
                            <th> SURNAME</th>
                            <th> EMAIL</th>
                            <th> PHONE</th>
                            <th> ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cv.map(
                                usercv =>
                                    <tr key={usercv.id}>
                                        <td>{usercv.name}</td>
                                        <td>{usercv.surname}</td>
                                        <td>{usercv.email}</td>
                                        <td>{usercv.phone}</td>
                                        <td>
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <button onClick={() => this.cvDetail(usercv.id)}  class="btn btn-success">detail</button>
                                        </div>
                                        </td>
                                    </tr>                         
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default ListCVComponent;