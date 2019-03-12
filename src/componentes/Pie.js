import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
    backgroundPosition: "center bottom",
    color: "white",
  },
  toolbar_vieja: {
    backgroundImage: `url(${FondoViejo})`,
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    color: "white",
  },
  toolbar_futura: {
    backgroundImage: `url(${FondoFuturo})`,
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    color: "white",
  },
});

//===========================================================================
// Pie
//===========================================================================
class Pie extends React.Component {
  // constructor
  //-------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      tipoToolbar: props.classes.toolbar_vieja
    }
  }

  // componentDidUpdate
  //-------------------------------------------------------------------------
  componentDidUpdate(prevProps) {
    const clases = this.props.classes;
    if (prevProps.paso !== this.props.paso) {
        this.setState({tipoToolbar:
          this.props.paso === 0
          ? clases.toolbar_vieja
          : this.props.paso === 3
          ? clases.toolbar_futura
          : clases.toolbar});
    }
  }

  // render
  //-------------------------------------------------------------------------
  render() {
    return(
      <AppBar position="static">
        <Toolbar className={this.state.tipoToolbar}>
          <Typography variant="h6" color="inherit">
            Viewnext 2019
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}


Pie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(estilos)(Pie);
