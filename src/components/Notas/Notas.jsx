import React, { Component } from 'react';

export default class Notas extends Component {
  render() {
    return (
      <div className="notas">
        { this.props.children }
      </div>
    )
  }
}
