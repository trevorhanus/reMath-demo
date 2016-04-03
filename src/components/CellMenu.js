import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './BaseComponent';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Input from 'react-bootstrap/lib/Input';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

class CellMenu extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      cell: {
        formula: this.props.cell.formula,
        symbol: this.props.cell.symbol
      },
      style: {
      }
    }

    this._bind([
      '_handleInputChange',
      '_handleSubmit',
      '_setFormat',
      '_handlePageClick',
      '_handleMouseUp',
      '_handleMouseDown',
      '_handleKeyDown',
      'removeCell'
    ]);
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.addEventListener('mousedown', this._handlePageClick, false);
    this.refs.formula.getInputDOMNode().focus();
    this.refs.formula.getInputDOMNode().select();
    this._positionLeft();
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this._handlePageClick);
  }

  _handlePageClick(e) {
    if (this.mouseIsDownOnMenu) {
      return;
    } else {
      this.props.close();
    }
  }

  _handleInputChange(prop, e) {
    var cell = this.state.cell;
    cell[prop] = e.target.value;
    this.setState({
      cell: cell
    });
  }

  _handleClick(e) {
    e.stopPropagation();
  }

  _handleMouseDown() {
    this.mouseIsDownOnMenu = true;
  }

  _handleMouseUp() {
    this.mouseIsDownOnMenu = false;
  }

  _handleKeyDown(e) {
    if (e.which === 27) {
      this.props.close()
    }
    if (e.which === 13) {
      this._handleSubmit(e);
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    // Set the Formula
    this.props.cell.updateSymbol(this.state.cell.symbol);
    this.props.setFormula(this.state.cell.formula);
    this.props.close();
  }

  _positionLeft() {
    const vw = window.innerWidth;
    const padding = 40;
    const rect = this.refs.container.getBoundingClientRect();
    const parentLeft = this.refs.container.offsetParent.getBoundingClientRect().left;

    if ((rect.left + rect.width + padding) > vw) {
      var left = (vw - rect.width - padding) - parentLeft;
    }

    this.setState({
      style: {
        left: left + 'px'
      }
    });
  }

  _setFormat(format) {
    this.props.cell.displayFormat = format;
  }

  removeCell(symbol) {
    this.props.cell._parentSheet.removeCell(symbol);
  }

  render() {
    const {cell} = this.props;
    return (
      <div
        className="cell-menu"
        onClick={this._handleClick}
        ref="container"
        style={this.state.style}
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        onKeyDown={this._handleKeyDown}
      >
        <ButtonToolbar style={{marginBottom: "5px"}}>
          <h5
            className="pull-left"
            style={{marginLeft: "5px"}}
          >{cell.symbol}</h5>
          <ButtonGroup
            bsSize="small"
            className="pull-right clearfix"
          >
            <Button
              onClick={() => this.removeCell(cell.symbol)}
              bsStyle="danger"
            >delete</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <form onSubmit={this._handleSubmit}>
          <Input
            ref="symbol"
            type="text"
            addonBefore="sym"
            value={this.state.cell.symbol}
            onChange={(e) => this._handleInputChange('symbol', e)}

          />
          <Input
            ref="formula"
            type="text"
            addonBefore="="
            value={this.state.cell.formula}
            onChange={(e) => this._handleInputChange('formula', e)}

          />
        </form>
      </div>
    )
  }
}

export default CellMenu;
