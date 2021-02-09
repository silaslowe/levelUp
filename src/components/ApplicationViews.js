import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList.js"
import { EventProvider } from "./event/EventProvider.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <GameProvider>
          <EventProvider>
            <Route exact path="/">
              <GameList />
            </Route>

            <Route exact path="/events">
              <EventList />
            </Route>
          </EventProvider>
        </GameProvider>
      </main>
    </>
  )
}
