import React from 'react';
import BaseComponent from './BaseComponent';
import {observer} from 'mobx-react';

import {Grid, Row, Col, Button} from 'react-bootstrap/lib';
import Cell from './Cell';
import AppHeader from './AppHeader';

@observer
class App extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
    }

    this._bind([
      'renderCells',
      'addCell'
    ]);
  }

  addCell() {
    const {sheet} = this.props;
    const symbol = 'temp' + sheet.cells.length
    sheet.addCell(symbol);
  }

  renderCells() {
    return this.props.sheet.cells.map(cell => {
      return (
        <div key={cell.id}>
          <Cell cell={cell} />
        </div>
      )
    });
  }

  render() {
    const {sheet} = this.props;
    return (
      <Grid>
        <AppHeader />
        <Row>
          <Col md={5} mdOffset={1} >
            {this.renderCells()}
            <Button
              bsStyle="primary"
              onClick={this.addCell}
            >
              add cell
            </Button>
          </Col>
          <Col md={5}>
            <ul>
              <li>Click on the cells. You can change the symbol and the formula.</li>
              <li>See what happens when you change the formula of a.</li>
              <li>c depends on a, so it's value is reactively updated when a's value changes.</li>
            </ul>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
