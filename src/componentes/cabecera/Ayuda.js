import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const estilos = theme => ({
  root: {
    width: '50%',
    opacity: '0.6',
    marginLeft: theme.spacing.unit * 10,
  },
  card: {
    width: 600,
  },
  media: {
    height: 0,
    paddingTop: '56%', // 16:9
  },
});

const ayudaImg = [
  ["ayuda-Paso00.png"],
  ["ayuda-Paso10.png", "ayuda-Paso11.png"],
  ["ayuda-Paso20.png", "ayuda-Paso21.png"],
  ["ayuda-Paso30.png"]
];
const ayudaTit = [
  "Conexión directa al Backend",
  "Uso de gestión de APIs",
  "Uso de fast data",
  "Último paso..."
];

const ayudaSub = [
  "Concepto tradicional",
  "Ventajas de la gestión de APIs",
  "Velocidad en la obtención de datos agregados",
  "Actualización instantánea"
];

const ayudaDet = [
  "En este escenario, el portal se conecta directamente al Backend, " +
  "invocando las operaciones que ofrece. Éste, a su vez, se conecta " +
  "con la Base de Datos para obtener la información pedida",
  "",
  "",
  ""
];

//===========================================================================
// Ayuda
//   props = [paso, ayuda, handleAyuda(abierto)]
//===========================================================================
class Ayuda extends React.Component {
  // render
  //-------------------------------------------------------------------------
  render() {
    const clases = this.props.classes;
    return (<div>
      <Drawer open={this.props.ayuda} onClose={() => this.props.handleAyuda(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => this.props.handleAyuda(false)}
          onKeyDown={() => this.props.handleAyuda(false)}
        >
          <Card className={clases.card}>
            <CardHeader
              title={ayudaTit[this.props.paso]}
              subheader={ayudaSub[this.props.paso]}
            />
            {
              ayudaImg[this.props.paso].map((img, i) => {return (
                <CardMedia
                  className={clases.media}
                  image={require("../../static/" + img)}
                  title="Viewnext"
                  key={i}
                />
              )})
            }
            <CardContent>
              <Typography component="p">
                {ayudaDet[this.props.paso]}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Drawer>
    </div>)
  }
}

Ayuda.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(estilos)(Ayuda);
