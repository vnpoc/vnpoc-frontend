// get
export function get(url, clientId) {
  var cabecera = clientId === undefined
    ? new Headers({
      'Content-Type': 'application/json',
      'Accept':  'application/json'
    })
    : new Headers({
        'X-IBM-Client-Id': clientId,
        'Content-Type': 'application/json',
        'Accept':  'application/json'
    });
    console.info({metodo: 'Invocaciones.get',
      url: url, clientId: clientId});
    return (fetch(url, {
                headers: cabecera
            })
            .then((resul) => {
                return resul.json()
            })
            .catch((error) => {
                console.error(error);
                return null
            })
        )
}

// update
export function update(url, clientId, cuerpo) {
  var cabecera = clientId === undefined
    ? new Headers({
      'Content-Type': 'application/json',
      'Accept':  'application/json'
    })
    : new Headers({
        'X-IBM-Client-Id': clientId,
        'Content-Type': 'application/json',
        'Accept':  'application/json'
    });
    console.info({metodo: 'Invocaciones.update',
      url: url, clientId: clientId, cuerpo: cuerpo});
    return (
      fetch(url, {
        method: 'PUT',
        headers: cabecera,
        body: JSON.stringify(cuerpo)
      })
            .then((resul) => {
                return resul.json()
            })
            .catch((error) => {
                console.error(error);
                return null
            })
        )
}

export default class Invocaciones {
}
