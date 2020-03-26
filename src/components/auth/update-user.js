import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import { updateUser } from "../../actions/authActions";


export default class UpdateUser extends Component{
    constructor (){
        super(props)

        this.state = {
            email: ''
            

        }
    }

    onChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value 
        });
      };

    onsubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email
          };
          
          axios.post('http://localhost:5000//update/:email/'+this.props.match.params.id, userData)
          this.props.updateUser(userData);
        window.location = './dashboard/';
    }

    render() {
        const { errors } = this.state;
    
        return (
          <div className="container">
            <div className="row">
              <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                  <i className="material-icons left"></i> Back to
                  home
                </Link>
                
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="name"
                      type="text"
                      className={classnames("", {
                        invalid: errors.email
                      })}
                    />
                    <label htmlFor="name">Email</label>
                    <span className="red-text">{errors.email}</span>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

Register.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { updateUser }
  )(withRouter(UpdateUser));
  