import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './Login.css';

const Login = () => {
  const { user, login, logout } = useUser();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (user) setIsSubmitted(true);
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form Submitted successfully:', formData);
      login({ username: formData.username, email: formData.email });
      setIsSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  const handleReset = () => {
    logout();
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="login-container animate-fade-in">
        <div className="glass-panel success-card">
          <h2 className="title-retro">¡Hola, {user?.username}!</h2>
          <p>Has iniciado sesión correctamente.</p>
          <button className="btn primary-btn mt-2" onClick={handleReset}>Cerrar Sesión</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container animate-fade-in">
      <div className="login-card glass-panel">
        <h1 className="title-retro">Login</h1>
        <p className="subtitle">Introduce tus datos para acceder</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
              placeholder="GamerTag"
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="player@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="******"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="login-submit-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
