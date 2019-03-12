import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ESTILOS = theme => ({
  root: {
    width: '100%',
    maxHeight: '600px',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


//============================================================================
// Assets
//    props: [assets, handleAssetValue(url, valor)]
//============================================================================
class Assets extends React.Component {
  // constructor
  //--------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      actualizado: false,
      clases: props.classes
    }
  }

  // componentDidUpdate
  //-------------------------------------------------------------------------
  componentDidUpdate(prevProps) {
    if (prevProps.assets !== this.props.assets)
      this.setState({actualizado: true});
  }

  // sigValue
  //-------------------------------------------------------------------------
  sigValue(asset) {
    return asset === undefined
      ? undefined
      : asset.value === "available"
      ? "reserved"
      : asset.value === "reserved"
      ? "unavailable"
      : "available"
  }

  // handleValue
  //--------------------------------------------------------------------------
  handleValue(fila) {
    if (fila._links !== undefined &&
        fila._links.modifica !== undefined &&
        fila._links.modifica.href !== undefined)
      this.props.handleAssetValue(fila._links.modifica.href,
        this.sigValue(fila));
  }

  // render
  //--------------------------------------------------------------------------
  render() {
    console.info({met: 'Assets.render', props: this.props, state: this.state});
    return (
      <div>
        <Paper className={this.state.clases.root}>
          <Table className={this.state.clases.table}>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Descripción</TableCell>
                <TableCell align="right">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.assets.map((fila,i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {fila.name}
                  </TableCell>
                  <TableCell align="right">{fila.id}</TableCell>
                  <TableCell align="right">{fila.description}</TableCell>
                  <TableCell align="right"
                    onClick={() => this.handleValue(fila)}>
                    {fila.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

Assets.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(ESTILOS)(Assets);
