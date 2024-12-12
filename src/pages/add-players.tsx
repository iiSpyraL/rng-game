import { useState } from "react";
import styled from "styled-components";
import { ButtonWrapper, PlayerList } from "./game";

export const AddPlayers = ({
  players,
  setPlayers,
  setView,
}: {
  players: string[];
  setPlayers: (players: string[]) => void;
  setView: (view: "game") => void;
}) => {
  const [newPlayer, setNewPlayer] = useState<string>("");

  return (
    <Wrapper>
      <ButtonWrapper>
        <button onClick={() => setView("game")}>Play game</button>
      </ButtonWrapper>
      <InputWrapper>
        <input
          placeholder="Player name"
          type="text"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
        />
      </InputWrapper>
      <ButtonWrapper>
        <button
          onClick={() => {
            setPlayers([...players, newPlayer]);
            setNewPlayer("");
          }}
          disabled={!newPlayer || players.some((p) => p === newPlayer)}
        >
          Add player
        </button>
      </ButtonWrapper>
      <PlayerList>
        {players.map((player) => (
          <PlayerWrapper key={player}>
            <span style={{ fontWeight: "bold" }}>{player}</span>
            <RemoveButton
              onClick={() => {
                const newPlayers = players.filter((p) => p !== player);

                setPlayers(newPlayers);
              }}
            >
              x
            </RemoveButton>
          </PlayerWrapper>
        ))}
      </PlayerList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const PlayerWrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  width: 100%;
`;

const RemoveButton = styled.span`
  color: red;
  font-weight: bold;
`;
