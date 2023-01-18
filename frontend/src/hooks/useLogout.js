import { useAuthContext } from './useAuthContext';
import { useBlogContext } from './useBlogContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: blogDispatch } = useBlogContext();

  const logout = () => {
    //remove the user from the localStorage
    localStorage.removeItem('user');

    //dispatch logout action
    dispatch({ type: 'LOGOUT' });
    blogDispatch({ type: 'SET_BLOG', payload: null });
  };
  return { logout };
};
