import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import {get} from '../../util/Invocaciones.js';

const estilos = theme => ({
  root: {
  },
});

const BE_END_POINT = "http://localhost:8080";

//============================================================================
// Busqueda
//============================================================================
class Monitorizacion extends React.Component {
  // constructor
  //-------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      origenes: undefined,
      valores: undefined
    }
  }

  // getResumen
  //-------------------------------------------------------------------------
  getResumen() {
    console.info({met: 'Monitorizacion.getResumen - INICIO'});
    get(BE_END_POINT + "/entities/origins", undefined)
    .then ((resul) => {
      console.info({met: 'Monitorizacion.getResumen', resul: resul});
      this.setState({origenes: resul});
    })
    .catch((error) => {
      console.error({met: 'Monitorizacion.getResumen', error: error})
    });
    get(BE_END_POINT + "/assets/values", undefined)
    .then ((resul) => {
      console.info({met: 'Monitorizacion.getResumen', resul: resul});
      this.setState({valores: resul});
    })
    .catch((error) => {
      console.error({met: 'Monitorizacion.getResumen', error: error})
    });
  }

  // handleResumen
  //-------------------------------------------------------------------------
  handleResumen() {
    console.info({met: 'Monitorizacion.handleResumen'});
    this.getResumen();
  }

  // render
  //-------------------------------------------------------------------------
  render() {
    const clases = this.props.classes;
    console.info({met: 'Monitorizacion.render', state: this.state});
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={32}>
            <Grid item xs={2}>
              <IconButton color="default" className={clases.button}
                aria-label="Resumen"
                onClick={() => this.handleResumen()}>
                <SearchIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="body1" color="inherit">
              {
                this.state.origenes === undefined ||
                this.state.origenes._embedded === undefined
                ? "..."
                : this.state.origenes._embedded.nodes.map((valor) => {
                  return " " + Object.keys(valor)[0] + ": " + Object.values(valor)[0]
                })
              }
            </Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography variant="body1" color="inherit">
              {
                this.state.valores === undefined ||
                this.state.valores._embedded === undefined
                ? "..."
                : this.state.valores._embedded.nodes.map((valor) => {
                  return " " + Object.keys(valor)[0] + ": " + Object.values(valor)[0]
                })
              }
            </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

Monitorizacion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(estilos)(Monitorizacion);
