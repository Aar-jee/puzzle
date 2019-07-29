import React, {Fragment} from 'react';
import './App.css';

let move = (board, x, y) => {
  if ((x === board.x) === (y === board.y)) return board;

  let tiles = board.tiles.slice();
  let start = board.x + board.y * board.width;
  let stop = x + y * board.width;
  let step = y === board.y ? 1 : board.width;

  if (start > stop) step = -step;

  for (let i = start; i !== stop; i += step) {
    [tiles[i + step], tiles[i]] = [tiles[i], tiles[i + step]];
  }
  return Object.assign({}, board, { tiles: tiles, x: x, y: y });
}

let finalSolution = (board, solution) => {
  return board.tiles.every((tile, i) => tile === solution[i]);
}

let BlockElem = (props) => {
  const className = props.isSpace ? "block zero" : "block";
  return (
    <button className={className} onMouseDown={props.onMouseDown}>
      {props.value}
    </button>
  );
}

let MainBoard = (props) => {
  let rows = [];
  for (let y = 0; y < props.board.height; y++) {
    let row = [];
    for (let x = 0; x < props.board.width; x++) {
      row.push(
        <BlockElem
          value={(props.board).tiles[x + y * (props.board).width]}
          isSpace={props.board.x === x && props.board.y === y}
          onMouseDown={() => props.onMouseDown(x, y)}
        />
      );
    }
    rows.push(<div className="tiles-row">{row}</div>);
  }
  return (<div className="tiles">{rows}</div>);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const board = {
      tiles: props.default,
      width: props.width,
      height: props.height,
      x: props.x,
      y: props.y
    };
    this.solution = props.res;
    this.state = { board: board, solved: finalSolution(board, this.solution) }
  }
  handleMouseDown(x, y) {
    let board = move(this.state.board, x, y);
    this.setState({ board: board, solved: finalSolution(board, this.solution) });
  }
  render() {
    return (
      <Fragment>
      <div className="background">
        <MainBoard
          board={this.state.board}
          onMouseDown={(x, y) => this.handleMouseDown(x, y)}
        />  
      </div>
      <div> {this.state.solved && <span className="congrats">Congratulations!</span>}</div>
      </Fragment>
    );
  }
}


