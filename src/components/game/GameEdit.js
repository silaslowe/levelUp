import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "./GameProvider"

export const GameEdit = (props) => {
  const history = useHistory()
  const gameId = parseInt(props.match.params.gameId)
  const { getSingleGame, updateGame, getGameTypes, gameTypes, game } = useContext(GameContext)
  const [editedGame, setEditedGame] = useState({})
  const [gameType, setGameType] = useState("")

  //   const [currentGame, setCurrentGame] = useState({})
  //   console.log(gameId)
  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  useEffect(() => {
    getGameTypes()
  }, [])

  useEffect(() => {
    getSingleGame(gameId)
      .then(setEditedGame)
      .then(() => setGameType(editedGame.game_type))
  }, [])

  /*
  Get game types on initialization so that the <select>
  element presents game type choices to the user.
  */

  const changeGameState = (domEvent) => {
    const newGameState = Object.assign({}, editedGame)
    newGameState[domEvent.target.name] = domEvent.target.value
    setEditedGame(newGameState)
  }

  //   const newAnimal = Object.assign({}, animal) // Create copy
  //   newAnimal[event.target.name] = event.target.value // Modify copy
  //   setAnimal(newAnimal) // Set copy as new state

  console.log("GAMETYPE", gameType)
  console.log("EDITED", editedGame)
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
            defaultValue={editedGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Max Number Of Players: </label>
          <input
            type="number"
            min="1"
            max="10"
            name="number_of_players"
            required
            className="form-control"
            defaultValue={editedGame.number_of_players}
            onChange={changeGameState}
          />
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
            defaultValue={editedGame.description}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="game_type_id">Game Type: </label>
          <select
            type="text"
            name="game_type"
            required
            className="form-control"
            onChange={changeGameState}
          >
            <option value="0">Select a game type</option>
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

          const gameUpdate = {
            id: editedGame.id,
            description: editedGame.description,
            title: editedGame.title,
            number_of_players: parseInt(editedGame.number_of_players),
            game_type: parseInt(editedGame.game_type.id),
          }

          // Send POST request to your API
          updateGame(gameUpdate).then(() => history.push("/"))
        }}
        className="btn btn-primary"
      >
        Edit
      </button>
    </form>
  )
}
