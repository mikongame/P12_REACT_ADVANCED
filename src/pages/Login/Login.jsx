import { useReducer, useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './Login.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, ...action.errors }
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  username: '',
  email: '',
  password: '',
  errors: {}
};

const Login = () => {
  const { user, login, logout } = useUser();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (user) setIsSubmitted(true);
  }, [user]);

  const handleChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name,
      value: e.target.value
    });
  };

  const validate = () => {
    let errors = {};
    if (!state.username) errors.username = 'Username is required';
    if (!state.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = 'Email is invalid';
    }
    if (state.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    
    if (Object.keys(errors).length === 0) {
      console.log('Form Submitted successfully:', state);
      login({ username: state.username, email: state.email });
      setIsSubmitted(true);
    } else {
      dispatch({ type: 'SET_ERROR', errors });
    }
  };

  const handleReset = () => {
    logout();
    dispatch({ type: 'RESET' });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="login-container animate-fade-in">
        <div className="glass-panel success-card">
          <h2 className="title-retro">Welcome Back, {user?.username}!</h2>
          <p>You have successfully logged into the MikonGames hub.</p>
          <button className="btn primary-btn mt-2" onClick={handleReset}>Logout / Reset</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container animate-fade-in">
      <div className="login-card glass-panel">
        <h1 className="title-retro">Player Login</h1>
        <p className="subtitle">Enter your details to track your scores</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={state.username}
              onChange={handleChange}
              className={state.errors.username ? 'input-error' : ''}
              placeholder="GamerTag"
            />
            {state.errors.username && <span className="error-text">{state.errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className={state.errors.email ? 'input-error' : ''}
              placeholder="player@example.com"
            />
            {state.errors.email && <span className="error-text">{state.errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className={state.errors.password ? 'input-error' : ''}
              placeholder="******"
            />
            {state.errors.password && <span className="error-text">{state.errors.password}</span>}
          </div>

          <button type="submit" className="login-submit-btn">
            Join the Arena
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
