import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, [])
    const fetchEvents = async() => {
        try {
            const response = await axios.get('http://localhost:8000/events');
            setEvents(response.data.events);
            console.log(response.data.events);

        } catch (error) {
            console.log(error);
        }
    }

    // console.log(events);

  return (
    <div className='container'>
        <div className="row my-5">
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
