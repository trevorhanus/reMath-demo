import React from 'react';
import BaseComponent from './BaseComponent';
import {observer} from 'mobx-react';

import Input from 'react-bootstrap/lib/Input';
import CellMenu from './CellMenu';

/* this takes a cell object from the Calc as its prop */

@observer
class Cell extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }

    this.cell = props.cell;

    this._bind([
      'handleKeyUp',
      'handleChange',
      'toggleShowInput',
      'setFormula',
      'getCellClass',
      '_handleClick',
      '_toggleMenu',
      'handleClickOutside'
    ]);
  }

  handleClickOutside(e) {
    this.setState({
      showMenu: false
    });
  }

  handleKeyUp(e) {
    if (e.which === 13) {
      this.setFormula(e.target.value);
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  setFormula(value) {
    const {cell} = this.props;
    if (!!value) {
      cell.setFormula(value);
    }
    // this.toggleShowInput();
  }

  toggleShowInput() {
    this.setState({
      showInput: !this.state.showInput
    });
  }

  _toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  getCellClass() {
    const {cell} = this.props;
    let classList = 'cell'
    if (cell.isDependent()) {
      classList += ' isDependent';
    }
    if (this.state.showMenu) {
      classList += ' highlighted'
    }
    return classList;
  }

  _handleClick(e) {
    if (!this.props.locked) {
      this._toggleMenu();
    }
  }

  render() {
    const {cell} = this.props;
    return (
      <div className={this.getCellClass()} onClick={this._handleClick}>

        {cell.symbol + ' = ' + cell.value()}

        {this.state.showMenu ?
          <CellMenu
            cell={cell}
            setFormula={this.setFormula}
            close={this._toggleMenu}
          /> : null
        }
      </div>
    );
  }
}

export default Cell;
