import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { GameContext } from "../game/GameProvider"
import { useHistory } from "react-router-dom"
import DateTimePicker from "react-datetime-picker"

export const EventForm = () => {
  const { getEvents, createEvent, events } = useContext(EventContext)
  const { getGames, games } = useContext(GameContext)
  const history = useHistory()

  const [currentEvent, setEvent] = useState({
    event_day: "",
    event_time: "",
    game: 0,
    location: "",
  })

  useEffect(() => {
    getEvents().then(() => getGames())
  }, [])

  const changeEventState = (domEvent) => {
    const newEventState = Object.assign({}, currentEvent)
    newEventState[domEvent.target.name] = domEvent.target.value
    setEvent(newEventState)
    console.log(newEventState.event_time)
  }

  console.log(currentEvent)
  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>

      <fieldset>
        <div className="form-group">
          <label htmlFor="game">Game: </label>
          <select
            name="game"
            className="form-control"
            value={currentEvent.game}
            onChange={changeEventState}
          >
            <option value="0">Select a game...</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            required
            autoFocus
            className="form-control"
            value={currentEvent.location}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="event_day">Date: </label>
          <input
            type="date"
            name="event_day"
            required
            autoFocus
            className="form-control"
            value={currentEvent.event_day}
            onChange={changeEventState}
          />
        </div>

        <fieldset>
          <label htmlFor="event_time">Event Time</label>
          <input
            type="time"
            name="event_time"
            required
            autoFocus
            className="form-control"
            value={currentEvent.event_time}
            onChange={changeEventState}
          />
        </fieldset>
      </fieldset>

      {/* Create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault()

          createEvent(currentEvent).then(() => {
            history.push("/events")
          })

          // Once event is created, redirect user to event list
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  )
}
