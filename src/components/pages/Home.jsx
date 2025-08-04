import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchEvents();
        fetchCategories();
    }, [selectedCategory])
    
    const fetchEvents = async() => {
        try {
            const url = selectedCategory
            ? `http://localhost:8000/events/category/${selectedCategory}`
            : 'http://localhost:8000';

          const response = await axios.get(url);
          setEvents(response.data.events);
        
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async() => {
        try {
            const response = await axios.get('http://localhost:8000/categories');
            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='container'>
        <div className="row my-5">
            <ul className="nav justify-content-center my-4">
                    <li className="nav-item">
                        <a href="#"
                            onClick={() => setSelectedCategory('')}
                            className={`nav-link fw-bold ${selectedCategory === '' ? 'active' : 'text-dark'}`}>
                            ALL
                        </a>
                    </li>
                {
                    categories?.map(category => (
                        <li className="nav-item" key={category.id}>
                            <a href="#"
                                onClick={() => setSelectedCategory(category.id)}
                                className={`nav-link fw-bold ${selectedCategory !== '' && selectedCategory === category.id ? 'active' : 'text-dark'}`}>
                                {category.name}
                            </a>
                        </li>
                    ))
                }
            </ul>
            {events?.map((item, index) => (
                <div className="col-md-4" key={item.id || index}>
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {item.title}
                        </h5>
                        <p className="card-text">
                            {item.description}
                        </p>
                        <div className="badge bg-dark">
                            Tickets : {item.tickets_available}
                        </div>
                    </div>
                    <div className="card-footer bg-white d-flex justify-content-between">
                        <span className="badge bg-primary">
                            {item.event_adress}
                        </span>
                        <span className="badge bg-danger">
                            {item.event_date}
                        </span>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}


export default Home;
