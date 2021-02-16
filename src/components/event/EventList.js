import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
  const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)
  const history = useHistory()

  useEffect(() => {
    getEvents()
  }, [])
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
            {event.joined ? (
              <button className="btn btn-3" onClick={() => leaveEvent(event.id)}>
                Leave
              </button>
            ) : (
              <button className="btn btn-2" onClick={() => joinEvent(event.id)}>
                Join
              </button>
            )}
          </section>
        )
      })}
    </article>
  )
}
