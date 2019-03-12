import React from 'react';

import Busqueda from './entity/Busqueda';
import Datos from './entity/Datos';
import Monitorizacion from './entity/Monitorizacion';
import '../index.css';

//============================================================================
// Entity
//    paso
//============================================================================
export default class Entity extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      destino: undefined,
      id: "El Id de la entidad"
    }
  }

  // handleInvoca
  //-------------------------------------------------------------------------
  handleInvoca(destino, id) {
    console.info({met: 'Entity.handleInvoca', destino: destino, id: id});
    this.setState({destino: destino, id: id});
  }

  // render
  //-------------------------------------------------------------------------
  render() {
    console.info({met: 'Entity.render', est: this.state})
    return (
      <div>
        <Busqueda paso={this.props.paso}
          handleInvoca={(destino, id) => this.handleInvoca(destino, id)}/>
        <Datos id={this.state.id} destino={this.state.destino}/>
        <Monitorizacion/>
      </div>
    )
  }
}
