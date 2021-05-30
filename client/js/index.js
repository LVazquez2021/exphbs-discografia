const inputArtista = document.getElementById('inputBusquedaArtista');
const inputTitulo = document.getElementById('inputBusquedaTitulo');
const inputAnio = document.getElementById('inputBusquedaAnio');
const btnBusqueda = document.getElementById('btnBusqueda');
console.log(btnBusqueda);
/* function mostrarScroll() {
    let scrollTop = document.documentElement.scrollTop;
}


console.log(mostrarScroll()); */


btnBusqueda.addEventListener('click', function() {
    let urlData = "";
    if (inputArtista.value == '' && inputTitulo.value == '' && inputAnio.value == '') {
        urlData += (urlData ? "/" : "");
        return
    }
    if (inputArtista.value) {
        urlData += (urlData ? "&" : "") + `artista=${inputArtista.value}`
    };
    if (inputTitulo.value) {
        urlData += (urlData ? "&" : "") + `titulo=${inputTitulo.value}`
    };
    if (inputAnio.value) {
        urlData += (urlData ? "&" : "") + `lanzamiento=${inputAnio.value}`
    };


    window.location.href = `/discos?${urlData}`
})