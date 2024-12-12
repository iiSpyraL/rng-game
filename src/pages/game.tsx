import { useState } from "react";
import styled from "styled-components";

export const Game = ({
  players,
  setView,
}: {
  players: string[];
  setView: (view: "addPlayers") => void;
}) => {
  const minValue = 1;
  const [maxValue, setMaxValue] = useState(1000);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [buttonState, setButtonState] = useState<"roll" | "nextPlayer">("roll");

  const onRoll = () => {
    const newMaxValue = Math.floor(Math.random() * maxValue + 1);

    setMaxValue(newMaxValue);
    setButtonState("nextPlayer");
  };

  const getNextPlayer = () => {
    if (playerIndex + 1 === players.length) {
      setPlayerIndex(0);
    } else setPlayerIndex(playerIndex + 1);
    setButtonState("roll");
  };

  const newList = (arr: string[]) => {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
      newArr[i] =
        arr[
          playerIndex + i >= arr.length
            ? playerIndex - arr.length + i
            : playerIndex + i
        ];
    }
    return newArr;
  };

  const onReset = () => setMaxValue(1000);
  return (
    <Wrapper>
      <Result loser={maxValue === 1}>
        {buttonState === "nextPlayer" ? (
          <BigNumber>{maxValue}</BigNumber>
        ) : (
          <span>
            Between <strong>{minValue}</strong> and <strong>{maxValue}</strong>
            ...
          </span>
        )}
      </Result>
      {players.length > 0 && (
        <CurrentPlayer loser={maxValue === 1}>
          {players[playerIndex]}
        </CurrentPlayer>
      )}
      {players.length > 1 && (
        <PlayerList>
          {newList(players)
            .filter((p) => p !== players[playerIndex])
            .map((player) => (
              <>
                <span>{player}</span>
              </>
            ))}
        </PlayerList>
      )}
      <ButtonWrapper>
        {maxValue === 1 ? (
          <button onClick={onReset}>Reset</button>
        ) : (
          <button onClick={buttonState === "roll" ? onRoll : getNextPlayer}>
            {buttonState === "roll" ? "Roll" : "Next player"}
          </button>
        )}
      </ButtonWrapper>
      <ButtonWrapper>
        <button onClick={() => setView("addPlayers")}>Change players</button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
`;

const BigNumber = styled.span`
  font-size: 3rem;
  font-weight: bold;
`;

const CurrentPlayer = styled.div<{ loser: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: ${({ loser }) => (loser ? "red" : "aquamarine")};
  font-weight: bold;
`;

export const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const ButtonWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Result = styled.div<{ loser: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ loser }) => (loser ? "red" : "aquamarine")};
`;
