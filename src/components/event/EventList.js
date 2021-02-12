import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
  const { events, getEvents } = useContext(EventContext)
  const history = useHistory()

  useEffect(() => {
    getEvents()
  }, [])
  console.log(events)
  return (
    <article className="events">
      <header className="events__header">
        <h1>Level Up Game Events</h1>
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/events/new" })
          }}
        >
          Register New Event
        </button>
      </header>
      {events.map((event) => {
        const e = event.event_time.toString()
        console.log(new Date(e).toString("hh:mm"))
        return (
          <section key={event.id} className="registration">
            <div className="registration__game">Name-O-Game: {event.game.title}</div>
            <div>Location: {event.location}</div>
            <div>
              {new Date(event.event_day).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {` `}@ All day long
            </div>
          </section>
        )
      })}
    </article>
  )
}
