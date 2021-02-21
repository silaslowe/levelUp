import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
  const { game, games, getGames, getSingleGame } = useContext(GameContext)
  const history = useHistory()
  useEffect(() => {
    getGames()
  }, [])

  console.log(game)
  return (
    <article className="games">
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" })
        }}
      >
        Register New Game
      </button>
      {games.map((game) => {
        return (
          <section key={`game--${game.id}`} className="game">
            <div className="game__title">{game.title}</div>
            <div className="game__players">{game.number_of_players} players needed</div>
            <div className="game__description">Description: {game.description}</div>
            <div className="game__type">Type: {game.game_type.label}</div>
            <button className="btn" onClick={() => history.push(`/games/${game.id}/edit`)}>
              Edit
            </button>
          </section>
        )
      })}
    </article>
  )
}
