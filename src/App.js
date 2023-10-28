import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Text,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xScore, setXScore] = React.useState(0);
  const [oScore, setOScore] = React.useState(0);

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    newSquares[square] = calculateNextValue(squares);

    if (calculateWinner(newSquares)) {
      calculateNextValue(squares) === "X"
        ? setXScore(xScore + 1)
        : setOScore(oScore + 1);
    }

    setSquares(newSquares);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setOScore(0);
    setXScore(0);
  }

  function startNewGame() {
    setSquares(Array(9).fill(null));
  }

  function ChangeColorButton({ value, onClick }) {
    let backgroundColor;
    let borderColor;
    let textColor;
    if (value === "X") {
      backgroundColor = "red.300";
      borderColor = "red.500";
      textColor = "red.500";
    } else if (value === "O") {
      backgroundColor = "green.300";
      borderColor = "green.500";
      textColor = "green.500";
    } else {
      backgroundColor = "blue.300";
      borderColor = "blue.500";
    }

    return (
      <Button
        w="100%"
        h="110px"
        fontSize="80px"
        fontWeight="semibold"
        paddingBottom="10px"
        border="4px"
        backgroundColor={backgroundColor}
        borderRadius="lg"
        borderColor={borderColor}
        onClick={onClick}
      >
        <Text textAlign="center" color={textColor}>
          {value}
        </Text>
      </Button>
    );
  }

  function renderSquare(i) {
    return (
      <ChangeColorButton
        value={squares[i]}
        onClick={() => selectSquare(i)}
        boxShadow="inner"
      />
    );
  }

  return (
    <Box>
      <Card h="calc(100vh)" align="center" backgroundColor="teal.200">
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={6}
        >
          <GridItem pt="150%" rowSpan={2} colSpan={1}>
            <Box
              align="center"
              borderRadius="lg"
              border="4px"
              borderColor="red.500"
              fontSize="20px"
              fontWeight="bold"
              boxShadow="dark-lg"
            >
              <Text backgroundColor="red.200">Player X Score</Text>
              <Text
                fontWeight="bold"
                backgroundColor="gray.200"
                fontSize="70px"
              >
                {xScore}
              </Text>
            </Box>
          </GridItem>

          <GridItem rowSpan={2} colSpan={3}>
            <CardHeader align="center">
              <Heading
                size="md"
                fontSize="40px"
                fontWeight="bold"
                textShadow="0 0 2px black"
              >
                {" "}
                {calculateStatus(
                  calculateWinner(squares),
                  squares,
                  calculateNextValue(squares)
                )}{" "}
              </Heading>
            </CardHeader>

            <CardBody align="center">
              <SimpleGrid
                columns={3}
                spacing={10}
                backgroundColor="gray.200"
                boxShadow="dark-lg"
                borderRadius="lg"
                padding={5}
              >
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}

                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}

                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
              </SimpleGrid>
            </CardBody>

            <CardFooter align="center">
              <SimpleGrid w="100%" columns={2} spacing={10}>
                <Button
                  h="100px"
                  colorScheme="yellow"
                  onClick={restart}
                  boxShadow="dark-lg"
                  fontSize="40px"
                  fontWeight="bold"
                >
                  RESTART
                </Button>
                <Button
                  h="100px"
                  colorScheme="green"
                  onClick={startNewGame}
                  boxShadow="dark-lg"
                  fontSize="40px"
                  fontWeight="bold"
                >
                  NEXT
                </Button>
              </SimpleGrid>
            </CardFooter>
          </GridItem>

          <GridItem pt="150%" rowSpan={2} colSpan={1}>
            <Box
              align="center"
              borderRadius="lg"
              border="4px"
              borderColor="green.500"
              fontSize="20px"
              fontWeight="bold"
              boxShadow="dark-lg"
            >
              <Text backgroundColor="green.200">Player O Score</Text>
              <Text
                fontWeight="bold"
                backgroundColor="gray.200"
                fontSize="70px"
              >
                {oScore}
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Card>
    </Box>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `PLAYER ${winner} WIN`
    : squares.every(Boolean)
    ? `DRAW`
    : `TURN PLAYER ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
  // return <Game />;
}

export default App;
