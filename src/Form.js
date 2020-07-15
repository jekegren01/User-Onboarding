import React, { useState, useEffect } from 'react';
import Input from './Input';
import axios from 'axios';
import * as yup from 'yup';

const Form = props => {
const defautlState = {
    name: '',
    email: '',
    password: '',
    terms: false
};

const [formState, setFormState] = useState(defautlState);
const [errors, setErrors] = useState({...defautlState, terms: ''});
const [buttonDisabled, setButtonDisabled] = useState(true);
const [users, setUsers] = useState([]);

let formSchema = yup.object().shape({
    name: yup.string().required("Please provide name."),
    email: yup
      .string()
      .required("Please provide a email.")
      .email("This is not a valid email."),
    password: yup
      .string()
      .required("Please give a password"),
    terms: yup
      .boolean()
      .oneOf([true], "Please agree to the terms and conditions")
  });

  useEffect(() => {
    formSchema.isValid(formState).then(valid => setButtonDisabled(!valid));
  }, [formState]);

const formSubmit = event => {
    event.preventDefault();
    console.log('form submitted');
    axios
        .post("https://reqres.in/api/users", formState)
        .then((res) => {console.log('Successful post', res) 
            setUsers([...users, res.data])})
        .catch(err => console.log('Error in post:', err));
};

const validateChange = event => {
    event.persist();
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid =>
        setErrors({
          ...errors,
          [event.target.name]: ""
        })
      )
      .catch(error =>
        setErrors({
          ...errors,
          [event.target.name]: error.errors[0]
        })
      );
  };

const inputChange = event => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
    validateChange(event);
  };

    return (
        <div>
            <form onSubmit={formSubmit}>
                <Input
                    type="text"
                    name="name"
                    onChange={inputChange}
                    value={formState.name}
                    label="Name"
                    errors={errors}
                />
                <Input
                    type="email"
                    name="email"
                    onChange={inputChange}
                    value={formState.email}
                    label="Email"
                    errors={errors}
                />
                <Input
                    type="password"
                    name="password"
                    onChange={inputChange}
                    value={formState.password}
                    label="Password"
                    errors={errors}
                />
                 <label className="terms" htmlFor="terms">
                    <input name="terms" type="checkbox" onChange={inputChange} />
                        Terms & Conditions
                </label>
                <button disabled={buttonDisabled}>Submit</button>
            </form>
            <div className='users'>
                <h2>Users</h2>
                <div className='user'>
                {users.map((user, i) => (
                    <div key={i} className='userList'>
                        <div className='sub'>
                        {user.name}
                        </div>
                        <div className='sub'>
                        {user.email}
                        </div>
                    </div>
                ))}
                </div>
            </div>

        </div>
    );
};

export default Form;