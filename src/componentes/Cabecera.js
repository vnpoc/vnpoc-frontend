import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

import Paso from './cabecera/Paso';
import Ayuda from './cabecera/Ayuda';
import Fondo from '../static/fondo_viewnext.jpg';
import FondoViejo from '../static/fondo_viewnext_old.jpg';
import FondoFuturo from '../static/fondo_viewnext_fut.jpg';

const estilos = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    backgroundImage: `url(${Fondo})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
  },
  toolbar_vieja: {
    backgroundImage: `url(${FondoViejo})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
  },
  toolbar_futura: {
    backgroundImage: `url(${FondoFuturo})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    color: "white",
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

//===========================================================================
// Cabecera
//   props: [paso, handlePaso]
//===========================================================================
class Cabecera extends React.Component {
  // constructor
  //-------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      tipoToolbar: props.classes.toolbar_vieja,
      ayuda: false
    }
  }

  // componentDidUpdate
  //-------------------------------------------------------------------------
  componentDidUpdate(prevProps) {
    const clases = this.props.classes;
    if (prevProps.paso !== this.props.paso) {
        this.setState({tipoToolbar: this.props.paso === 0
          ? clases.toolbar_vieja
          : this.props.paso === 3
          ? clases.toolbar_futura
          : clases.toolbar});
    }
  }

  // handleAyuda
  //-------------------------------------------------------------------------
  handleAyuda(abierto) {
    this.setState({ayuda: abierto});
  }

  // render
  //-------------------------------------------------------------------------
  render() {
    const clases = this.props.classes;
    console.info({met: "Cabecera.render", state: this.state, paso: this.props.paso});
    return(
      <AppBar className={clases.root} position="static">
        <Toolbar className={this.state.tipoToolbar}>
          <Typography variant="h4" color="inherit">
            <br/>
            POC API Management - Fast Data
            <br/><br/>
          </Typography>
          <IconButton color="primary" className={clases.button} aria-label="Ayuda"
            onClick={() => this.handleAyuda(true)}>
            <HelpIcon/>
          </IconButton>
          <Ayuda paso={this.props.paso}
            ayuda={this.state.ayuda}
            handleAyuda={(abierto) => this.handleAyuda(abierto)}/>
          <Paso paso={this.props.paso} handlePaso={(paso) => {this.props.handlePaso(paso)}}/>
        </Toolbar>
      </AppBar>
    )
  }
}

Cabecera.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(estilos)(Cabecera);
