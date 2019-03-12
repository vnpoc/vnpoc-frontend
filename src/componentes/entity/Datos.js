import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { UnfoldMore, UnfoldLess } from '@material-ui/icons';

import Assets from './datos/Assets';
import {get} from '../../util/Invocaciones.js';
import {update} from '../../util/Invocaciones.js';
import '../../index.css';

// const BE_END_POINT = "http://localhost:8080";
const BE_END_POINT = "https://vnpoc-service-mongo-prod.herokuapp.com/";
// const API_CONNECT_END_POINT = "https://api.eu.apiconnect.ibmcloud.com/jgarciahviewnextcom-dev/sb/poc";
const API_CONNECT_END_POINT = "https://api.eu-gb.apiconnect.appdomain.cloud/jmorenovnextgmailcom-dev/vnpoc/vnpoc/v1";
const FIND_ENTITY = "/entities?identifier=";
// const CLIENT_ID = "48a28e2a-4950-4a29-9a5c-b2878acdd5be";
const CLIENT_ID = "7ba9d75e-b5fa-4f8b-8e6b-37df4df01fe6";

//============================================================================
// Datos
//    props: [id]
//============================================================================
export default class Datos extends React.Component {
  // constructor
  //-------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      name: "El nombre de la entidad",
      description: "La descripción de la entidad",
      origin: "Qué sistema conoce los datos",
      abierto: true,
      assets: [],
      _links: {
        modifica: {
          href: undefined
        }
      }
    }
  }

  // componentDidUpdate
  //-------------------------------------------------------------------------
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id
      || prevProps.destino !== this.props.destino) {
      this.recalcula();
    }
  }

  // recalcula
  //-------------------------------------------------------------------------
  recalcula() {
    var endpoint = this.props.destino === "apiconnect"
      ? API_CONNECT_END_POINT
      : BE_END_POINT;
    this.setState({
      name: "Calculando...",
      description: "Calculando...",
      origin: "Calculando...",
      assets: []
    });
    this.getEntity(endpoint);
  }

  // modificaOrigin
  //-------------------------------------------------------------------------
  modificaOrigin() {
    var endpoint = this.state._links.modifica.href;
    var cuerpo = {
      description: this.state.origin === 'monolito'?'MIGRADO':'NO MIGRADO',
      origin: this.state.origin === 'monolito'?'microservicio':'monolito'
    }
    if (endpoint !== undefined) {

      this.setState({
        description: "Modificando...",
        origin: "Modificando..."
      });
      this.updateEntity(endpoint, cuerpo);
    }
  }

  // getEntity
  //-------------------------------------------------------------------------
  getEntity(endpoint) {
    var noEnc = this.props.id + " NO ENCONTRADO";
    var entidad = {id: undefined, name: noEnc
      , description: noEnc, origin: noEnc};
    get(endpoint + FIND_ENTITY + this.props.id, CLIENT_ID)
    .then ((resul) => {
      console.info({met: 'Datos.getEntity', resul: resul});
      if (resul !== undefined && resul != null &&
        resul._embedded.entities.length > 0) {
        entidad = resul._embedded.entities[0];
      }
      this.setState(entidad);
      if (entidad._links !== undefined &&
        entidad._links.assets !== undefined &&
        entidad._links.assets.href !== undefined)
        this.getAsset(entidad._links.assets.href);
    })
    .catch((error) => {
        console.error({met: 'Datos.getEntity', error: error});
        this.setState(entidad);
    })
  }

  // updateEntity
  //-------------------------------------------------------------------------
  updateEntity(endpoint, cuerpo) {
    var noEnc = this.props.id + " NO ACTUALIZADO";
    var entidad = {id: undefined, name: noEnc
      , description: noEnc, origin: noEnc};

    console.info({met: 'Datos.updateEntity', endpoint: endpoint});
    update(endpoint, CLIENT_ID, cuerpo)
      .then ((resul) => {
        console.info({met: 'Datos.updateEntity', resul: resul});
        if (resul !== undefined && resul != null) {
          entidad = resul;
        }
        this.setState(entidad);
      })
      .catch((error) => {
          console.error({met: 'Datos.updateEntity', error: error});
          this.setState(entidad);
      })
  }

  // getAsset
  //-------------------------------------------------------------------------
  getAsset(url_padre) {
    get(url_padre, CLIENT_ID)
    .then((resul) => {
      console.info({met: 'Datos.getAsset', resul: resul});
      this.setState({assets: resul._embedded.assets});
    })
    .catch((error) => {
        console.error({met: 'Datos.getAsset', error: error});
    })
  }

  // updateAsset
  //-------------------------------------------------------------------------
  updateAsset(endpoint, cuerpo) {
    console.info({met: 'Datos.updateAsset', endpoint: endpoint});
    update(endpoint, CLIENT_ID, cuerpo)
      .then ((resul) => {
        console.info({met: 'Datos.updateAsset', resul: resul});
        this.recalcula();
      })
      .catch((error) => {
          console.error({met: 'Datos.updateAsset', error: error});
      })
  }

  // handleCambiaAbierto
  //-------------------------------------------------------------------------
  handleCambiaAbierto() {
    this.setState({abierto: !this.state.abierto});
  }

  // handleAssetValue
  //-------------------------------------------------------------------------
  handleAssetValue(url, valor) {
    console.info({met: "Datos.handleAssetValue", url: url, valor: valor});
    this.updateAsset(url, {value: valor});
  }

  // handleOrigin
  //-------------------------------------------------------------------------
  handleOrigin() {
    this.modificaOrigin();
  }

  // renderDetalle
  //-------------------------------------------------------------------------
  renderDetalle() {
    return (
      <div id="entityDetalle">
        <UnfoldLess onClick={() => this.handleCambiaAbierto()}/>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Id
            </Typography>
            <Typography component="p">
              {this.props.id}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Descripción
            </Typography>
            <Typography component="p">
              {this.state.description}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Sistema origen
            </Typography>
            <Typography component="p" onClick={() => this.handleOrigin()}>
              {this.state.origin}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }

  // renderAssets
  //-------------------------------------------------------------------------
  renderAssets() {
      return (
        <div>
          <UnfoldMore onClick={() => this.handleCambiaAbierto()}/>
          <Assets assets={this.state.assets}
            handleAssetValue={(url, valor) => this.handleAssetValue(url, valor)}/>
        </div>
      )
  }

  // render
  //-------------------------------------------------------------------------
  render() {
    return (<div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Nombre
          </Typography>
          <Typography component="p">
            {this.state.name}
          </Typography>
        </CardContent>
      </Card>
      {
        this.state.abierto
        ? this.renderDetalle()
        : this.renderAssets()
      }
    </div>)
  }
}
