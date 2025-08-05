import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../App';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  useEffect(() => {
    if(loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser]);


  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/login", user);

      if(response.data.error) {
        toast.error(response.data.message, { position: 'top-right' });
      } else {
        toast.success(response.data.message, { position: 'top-right' });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setLoggedInUser(response.data.user);
        navigate('/');
      }

    } catch (error) {
      console.log(error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5 className="text-center mt-2">
                Login
              </h5>
            </div>
             <div className="card-body">
              <form action="" onSubmit={(e) => loginUser(e)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email*</label>
                    <input type="text" id="email" required className="form-control" 
                      onChange={(e) => setUser({
                        ...user, email: e.target.value
                      })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password*</label>
                    <input type="password" id="password" required className="form-control" 
                      onChange={(e) => setUser({
                        ...user, password: e.target.value
                      })} />
                  </div>
                  {
                    loading ? 
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Submitting...
                    </button> 
                    :
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  }
                  
              </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
