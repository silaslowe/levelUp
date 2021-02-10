import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from "react-router-dom"

export const GameForm = () => {
  const history = useHistory()
  const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  useEffect(() => {
    getGameTypes()
  }, [])

  let num_of_players = []

  for (let i = 1; i < 11; i++) {
    num_of_players.push(i)
  }

  const [currentGame, setCurrentGame] = useState({
    title: "",
    number_of_players: 0,
    description: "",
    game_type_id: 0,
  })

  /*
  Get game types on initialization so that the <select>
  element presents game type choices to the user.
  */
  useEffect(() => {
    getGameTypes()
  }, [])

  /*
  Update the `currentGame` state variable every time
  the state of one of the input fields changes.
  */
  const changeGameState = (domEvent) => {
    const newGameState = Object.assign({}, currentGame)
    newGameState[domEvent.target.name] = domEvent.target.value
    setCurrentGame(newGameState)
  }

  console.log(currentGame)
  console.log(num_of_players)
  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Max Number Of Players: </label>
          <select
            type="text"
            name="number_of_players"
            required
            className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          >
            {num_of_players.map((nop) => (
              <option key={nop} value={nop}>
                {nop}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Description: </label>
          <input
            type="text"
            name="description"
            required
            className="form-control"
            value={currentGame.description}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="game_type_id">Game Type: </label>
          <select
            type="text"
            name="game_type_id"
            required
            className="form-control"
            value={currentGame.game_type_id}
            onChange={changeGameState}
          >
            {gameTypes.map((gt) => (
              <option key={gt.id} value={gt.id}>
                {gt.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault()

          const game = {
            description: currentGame.description,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.number_of_players),
            game_type_id: parseInt(currentGame.game_type_id),
          }

          // Send POST request to your API
          createGame(game).then(() => history.push("/"))
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  )
}
