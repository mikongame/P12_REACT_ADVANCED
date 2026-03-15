import { createContext, useContext, useReducer, useMemo } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false
};

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = useMemo(() => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: (userData) => dispatch({ type: 'LOGIN', payload: userData }),
    logout: () => dispatch({ type: 'LOGOUT' })
  }), [state]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
