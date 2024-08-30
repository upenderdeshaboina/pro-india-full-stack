import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './register.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show,setShow]=useState(false)
    const { register } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        register({ email, password });
    };

    const onChangePass=()=>{
        setShow(!show)
    }

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className='form'>
                <div className='input-co'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id='email'
                        className='input'
                    />
                </div>
                <div className='input-co'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type={show?'text':'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id='password'
                    />
                </div>
                <div className='text'>
                    <div className='check'>
                        <input type='checkbox' id='checkbox' onChange={onChangePass}/>
                        <label htmlFor='checkbox'>Show password</label>
                    </div>
                    <div className='redirect'>
                        <p>have an account: <Link to='/'>
                            Login
                        </Link></p>
                    </div>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
