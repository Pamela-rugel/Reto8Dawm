let cargarDatos = () => {
    /*alert("CARGAR DATOS")*/

    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            console.log(xml);

            let escritores = xml.getElementsByTagName('escritor')

            for (let escritor of escritores) {
                let id = escritor.getElementsByTagName('id')[0].textContent
                let nombre = escritor.getElementsByTagName('nombre')[0].textContent

                let plantilla = `<option value ="${id}">${nombre}</option>`

                document.querySelector('div.input-group > select').innerHTML += plantilla
            }
        })
        .catch(console.error);




}


window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
});


const selectElement = document.querySelector('select');

selectElement.addEventListener('change', (event) => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
        .then(response => response.json())
        .then(data => {
            let contenedor = document.getElementById('frases')
            contenedor.innerHTML = ``

            let id_autor_select = event.target.value
            console.log(event.target.value.textContent)
            let nombre = event.target.options[event.target.selectedIndex].text
            let frases = data.frases

            for (let info of frases) {
                let id_autor = info.id_autor
                let frase = info.texto
                if (id_autor == id_autor_select) {
                    let plantilla = `<div class="col-lg-3">
                                <div class="test-inner ">
                                    <div class="test-author-thumb d-flex">
                                        <div class="test-author-info">
                                            <h4>${nombre}</h4>                                            
                                        </div>
                                    </div>
                                    <span>${frase}</span>
                                    <i class="fa fa-quote-right"></i>
                                </div>
                            </div>`
                    contenedor.innerHTML+=plantilla
                }
            }


        })
        .catch(console.error);
});