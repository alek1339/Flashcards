import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuthRedirect = () => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);
};

export default useAuthRedirect;
