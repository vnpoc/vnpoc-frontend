import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import '../../index.css';

//============================================================================
// Busqueda
//   props: [paso, handleInvoca(destino, id)]
//============================================================================
export default class Busqueda extends React.Component {
  // constructor
  //-------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    }
  }

  // handleId
  //-------------------------------------------------------------------------
  handleId(id) {
    this.setState({id: id});
  }

  // renderBE
  //-------------------------------------------------------------------------
  renderBE() {
    return (
      <Grid item xs={2}>
        <Button variant="outlined" color="inherit"
          onClick={() => this.props.handleInvoca('be', this.state.id)}>
          Invocación BE <SearchIcon/>
        </Button>
      </Grid>
    )
  }

  // renderAPI
  //-------------------------------------------------------------------------
  renderAPI() {
    return ([
      <Grid item xs={2} key="apiconnect">
        <Button variant="outlined" color="inherit"
          onClick={() => this.props.handleInvoca('apiconnect', this.state.id)}>
          Invocación API Connect <SearchIcon/>
        </Button>
      </Grid>,
      <Grid item xs={2} key="apigee">
        <Button variant="outlined" color="inherit"
          onClick={() => this.props.handleInvoca('apigee', this.state.id)}>
          Invocación APIGee <SearchIcon/>
        </Button>
      </Grid>
    ])
  }

  // render
  //-------------------------------------------------------------------------
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={8}>
            <Grid item xs={2}>
              <InputBase placeholder="ID…" className="fondoClaro"
                value={this.state.id}
                onChange={(e) => this.handleId(e.target.value)}/>
            </Grid>
            {
              this.props.paso === 0
                ? this.renderBE()
                : this.renderAPI()
            }
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}
