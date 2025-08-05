import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../App';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
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

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/register", user);
      const status = response.data.error ? 'error' : 'success';

      toast[status](response.data.message, {
        position: 'top-right'
      });
      navigate('/login');
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
                Register
              </h5>
            </div>
             <div className="card-body">
              <form action="" onSubmit={(e) => registerUser(e)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name*</label>
                    <input type="text" id="name" required className="form-control"
                      onChange={(e) => setUser({
                        ...user, name: e.target.value
                      })} />
                  </div>
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
