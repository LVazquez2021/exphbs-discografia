const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 8080;
const discos = require('./discos.json');


/* Configuracion de Handlebars para express */
app.engine('handlebars', expHbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

/**************************************************/
/*carpeta de recursos estaticos*/
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
/**************************************************/

/**endpoint para la busqueda de discos */

app.get('/', function(req, res) {
    res.render('home', {
        titulo: 'HOME',
        labelInput: '¡ingrese su busqueda!'
    });
});

app.get('/discos', function(req, res) {
    const { artista, titulo, anio } = req.query
    let resultados = discos.discos
        /* if (artista == '' && titulo == '' && anio == '') {
            resultados = resultados.filter(disco => disco.anio.toString() === anio);
        } */

    if (artista) {
        resultados = resultados.filter((disco) => disco.artista.toLowerCase().includes(artista.toString().toLocaleLowerCase()))

    };
    if (titulo) {
        resultados = resultados.filter((disco) => disco.titulo.toLowerCase().includes(titulo.toLowerCase()))

    };
    if (anio) {
        resultados = resultados.filter((disco) => disco.anio.toString() == anio);
    }


    res.render('grilla', {
        discos: resultados,
    });
})

app.get('/detalledisco', (req, res) => {
    let resultados = discos.discos;
    const disco = resultados.find((disco) => disco.id == req.query.id);


    res.render("disco", {
        disco,
        titulo: `Detalle de ${disco.titulo}`,
    });
})





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});