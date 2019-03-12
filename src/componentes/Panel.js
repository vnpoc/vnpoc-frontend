import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Cabecera from './Cabecera';
import Entity from './Entity';
import Pie from './Pie';

const estilos = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 600,
  },
});

//===========================================================================
// Panel
//===========================================================================
class Panel extends React.Component {
  // constructor
  //-------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      paso: 0
    }
  }

  // handlePaso
  //-------------------------------------------------------------------------
  handlePaso(nuevoPaso) {
    this.setState({paso: nuevoPaso});
  }

  // render
  //-------------------------------------------------------------------------
  render() {
    const clases = this.props.classes;

    return(
      <div>
        <Cabecera className={clases.root} paso={this.state.paso}
          handlePaso={(paso) => this.handlePaso(paso)}/>
        <Paper className={clases.root} elevation={1}>
          <Entity paso={this.state.paso}/>
        </Paper>
        <Pie paso={this.state.paso}/>
      </div>
    )
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(estilos)(Panel);
