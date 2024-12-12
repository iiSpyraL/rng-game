import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Game } from "./pages/game";
import { AddPlayers } from "./pages/add-players";
import styled from "styled-components";

function App() {
  const [players, setPlayers] = useState<string[]>([]);

  const [view, setView] = useState<"game" | "addPlayers">("addPlayers");
  return (
    <Wrapper>
      <h2>RNG Drinking Game</h2>
      {view === "game" && <Game players={players} setView={setView} />}
      {view === "addPlayers" && (
        <AddPlayers
          players={players}
          setPlayers={setPlayers}
          setView={setView}
        />
      )}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  grid-template-rows: 1fr 5fr;
`;
