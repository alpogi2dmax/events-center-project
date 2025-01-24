import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import EventCard from './EventCard'
import { parse, isDate } from "date-fns";



function EventList({user}) {

    const [events, setEvents] = useState([])
    
      useEffect(() => {
        fetch('/events')
        .then(r => r.json())
        .then(data => setEvents(data))
      }, [])

      const sortedEvents = events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime()
    });

    const formSchema = yup.object().shape({
      name: yup.string().required("Must enter event name"),
      date: yup.date().required("Date is Required"),
      venue: yup.string().required("Venue is required"),
      city: yup.string().required("Must enter city"),
      state: yup.string().required("Must enter state"),
      price: yup.number().positive().required("Price must be a positive number")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            date: "",
            image: "",
            venue: "",
            city: "",
            state: "",
            price: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log("Submitting values:", values);
            fetch("/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((event) => {
                addEvent(event)
                alert('Event has been added!')
                console.log(event)
            })
        },
    })

    function addEvent(event) {
      setEvents([...events, event])
    }

    function handleDeleteEvent(deletedEvent) {
        setEvents(events.filter(event => event.id !== deletedEvent.id))
    }

        

    return (
        <div className='list'>
            <h1>Upcoming Events</h1>
            {sortedEvents.map(event => (
                <EventCard key={event.id} event={event} user={user} onDeleteEvent={handleDeleteEvent}/>
            ))}
            <h2>Add Event</h2>
            <form onSubmit={formik.handleSubmit}>
              <label>Event Name: </label>
              <input type='text' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} />
              <p style={{color: "red" }}> {formik.errors.name}</p>
              <br></br>
              <label>Event Date: </label>
              <input type='date' name='date' id='date' value={formik.values.date} onChange={formik.handleChange} />
              <p style={{color: "red" }}> {formik.errors.date}</p>
              <br></br>
              <label>Image: </label>
              <input type='text' name='image' id='image' value={formik.values.image} onChange={formik.handleChange} />
              <br></br>
              <br></br>
              <label>Event Venue: </label>
              <input type='text' name='venue' id='venue' value={formik.values.venue} onChange={formik.handleChange} />
              <p style={{color: "red" }}> {formik.errors.venue}</p>
              <br></br>
              <label>Event City: </label>
              <input type='text' name='city' id='city' value={formik.values.city} onChange={formik.handleChange}  />
              <p style={{color: "red" }}> {formik.errors.city}</p>
              <br></br>
              <label>Event State: </label>
              <input type='text' name='state' id='text' value={formik.values.state} onChange={formik.handleChange} />
              <p style={{color: "red" }}> {formik.errors.state}</p>
              <br></br>
              <label>Event Price: </label>
              <input type='number' name='price' id='price' value={formik.values.price} onChange={formik.handleChange} />
              <p style={{color: "red" }}> {formik.errors.price}</p>
              <br></br>
              <button type='submit'>Add Event</button>
            </form>
        </div>
    )

}

export default EventList