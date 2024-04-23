'use client'


import { AppDispatch } from '@/redux-store/store';
import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../../utils/alert/alert';
import { useRouter } from 'next/navigation';
import {  loginAsync, registerAsync } from '@/redux-store/login-reducer/loginSlice';

const Login = () => {

    const router = useRouter()
    const dispatch: AppDispatch = useDispatch();
    const [email, setEmail] = useState('huy123@gmail.com');
    const [password, setPassword] = useState('123456');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLogin , setIsLogin] = useState(true);



    const handleLogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            showAlert('error', 'Please enter email and password');
            return;
        }
        const user = {
            email,
            password
        }
        const response = await dispatch(loginAsync(user))
        if (response.payload) {
             router.push('/')
             showAlert('success', 'Login successful.');
        } else {
            showAlert('error', 'Login failed!')
        }
    };

    const handleChooseAction = () => {
        setIsLogin(!isLogin);
    }

    const handleRegister = async () => {
        if (email.trim() === '' || password.trim() === '' || firstName.trim() === '' || lastName.trim() === '') {
            showAlert('error', 'Please enter email, password, firstName and lastName');
            return;
        }
        if (!isLogin) { 
            const user = {
                email,
                password,
                firstName,
                lastName,
            };
            const response = await dispatch(registerAsync(user));
            if (response) {
                showAlert('success', 'Register successful.');
                setIsLogin(true); 
                setEmail(''); 
                setEmail(''); 
            } else {
                showAlert('error', 'Register failed!');
            }
        }
    };

    return (
        <div className="login-screen row vw-100" style={{ height: '100%', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
            
            <div className='box-login col-md-5'>
                <div className="row">
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => { handleChooseAction() }}>
                            Login
                        </button>

                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => { handleChooseAction() }} style={{backgroundColor: "green"}}>
                            Register
                        </button>

                    </div>
                </div>
                <div className="card m-lg-4" style={{ padding: '25px' }}>
                    <div className="header-form" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <h5 className="login-text">
                            {isLogin ? 'Login ' : 'Register'}
                        </h5>
                    </div>

                    <div className="line" style={{ borderBottom: '1px solid #C0C0C0', margin: '15px 0 20px 0' }}></div>
                    {!isLogin ? <>
                        <div className="input-group  mt-2">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />

                        </div>
                        <div className="input-group mt-2">
                            <input
                                className="form-control"
                                placeholder="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </> : ""}
                   
                    <div className="input-group mt-2">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group mt-2 mb-10">
                        <input
                            className="form-control"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>



                    <div className="row">
                        <div className="col-12">
                            {isLogin ? <><button type="submit" className="btn btn-primary btn-block" onClick={() => { handleLogin() }}>
                                Login
                            </button></> : <>
                                    <button type="submit" className="btn btn-primary btn-block" onClick={() => { handleRegister() }} style={{backgroundColor:"green"}}>
                                        Register
                                    </button>
                            </> }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;