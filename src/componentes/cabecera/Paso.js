import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';

const estilos = theme => ({
  root: {
    width: '50%',
    opacity: '0.6',
    marginLeft: theme.spacing.unit * 10,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  paso: {
    opacity: '1',
  },
});

//===========================================================================
// Paso
//   paso
//   handlePaso
//===========================================================================
class Paso extends React.Component {
  // getPasos
  //-------------------------------------------------------------------------
  getPasos() {
    return ["Conectado a BE", "Conectado a API", "Con Fast Data", "Reactivo"];
  }

  // getContenidoPaso
  //-------------------------------------------------------------------------
  getContenidoPaso(paso) {
    switch (paso) {
      case 0:
        return 'Conectado a BE...';
      case 1:
        return 'Conectado a API';
      case 2:
        return 'Con fast data';
      default:
        return 'Reactivo';
    }
  }

  // handlePaso
  //-------------------------------------------------------------------------
  handlePaso(paso) {
    console.info({met: 'Paso.handlePaso', paso: paso});
    this.props.handlePaso(paso);
  }

  // render
  //-------------------------------------------------------------------------
  render() {
    const clases = this.props.classes;
    console.info({met: 'Paso.render', state: this.state, props: this.props});
    return (
      <div className={clases.root}>
        <Stepper activeStep={this.props.paso}>
          {
            this.getPasos().map((etiqueta, i) => {
              return (
                <Step key={etiqueta}>
                  <StepLabel>
                    <StepButton onClick={() => this.handlePaso(i)} className="paso">
                      {etiqueta}
                    </StepButton>
                  </StepLabel>
                </Step>
              )
            })
          }
        </Stepper>
      </div>
    )
  }
}

Paso.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(estilos)(Paso);
