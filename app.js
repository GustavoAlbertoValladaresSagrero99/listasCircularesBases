import Base from "./base.js";
import Route from "./route.js";

class App
{
    constructor()
    {
        this.ruta = new Route();
        this.btnAgregarBase = document.querySelector("#agregarBase");
        this.btnEliminarBase = document.querySelector("#eliminarBase");
        this.btnAgregarTicket = document.querySelector("#agregarTicket");
        this.btnListar = document.querySelector("#listar");

        this.tabla = document.querySelector("#table");
        this.mensajeAsunto = document.querySelector("#msjAsunto");
        this.mensajeContexto = document.querySelector("#msjContexto");

        this.inBaseNAgregar = document.querySelector("#txtNombreBase");
        this.inBaseMAgregar = document.querySelector("#txtMinutosBase");
        this.inBaseEliminar = document.querySelector("#txtNombreBaseEliminar");

        this.inticketBase = document.querySelector("#ticketBase");
        this.inticketInicio = document.querySelector("#ticketInicio");
        this.inticketRecorrido = document.querySelector("#ticketRecorrido");


        //Agregar escuchadores de evento
        this.btnAgregarBase.addEventListener("click", this._agregarBase);
        this.btnEliminarBase.addEventListener("click", this._eliminarBase);
        this.btnAgregarTicket.addEventListener("click", this._agregarTicket);
        this.btnListar.addEventListener("click", this._listar);
    }


    _agregarBase = () =>
    {
        let txtName = this.inBaseNAgregar.value.toUpperCase();
        let txtDuration = Number(this.inBaseMAgregar.value);
        let base;
        if(!(txtName && txtDuration))
        {
            this.mensajeAsunto.innerHTML = "Error: ";
            this.mensajeContexto.innerHTML = "Faltan datos por llenar";
            return;
        }

        base = new Base(txtName, txtDuration);


        if(this.ruta.addBase(base) == null)
        {
            this.mensajeAsunto.innerHTML = "Error: ";
            this.mensajeContexto.innerHTML = "Base ya existe!";
            return;
        }

        this.mensajeAsunto.innerHTML = "Se agrego la base: ";
        this.mensajeContexto.innerHTML = `${base.getName()} - duración: ${base.getDuration()}`;

    }

    _eliminarBase = () =>
    {
        let txtEliminar = this.inBaseEliminar.value.toUpperCase();
        if(!(txtEliminar))
        {
            this.mensajeAsunto.innerHTML = "Error: ";
            this.mensajeContexto.innerHTML = "Campos 'eliminar' vacio";
            return;
        }
        if(this.ruta.deleteByName(txtEliminar) == null)
        {
            this.mensajeAsunto.innerHTML = "Error: ";
            this.mensajeContexto.innerHTML = "No se pudo eliminar la base";
            return;
        }

        this.mensajeAsunto.innerHTML = "Se elimino la base: ";
        this.mensajeContexto.innerHTML = txtEliminar;
    }

    _agregarTicket = () =>
    {
        let txtTicketName = this.inticketBase.value.toUpperCase();
        let txtTickeHour = Number(this.inticketInicio.value);
        let txtTicketMinutes = Number(this.inticketRecorrido);
        if(!(txtTicketName && txtTickeHour && txtTicketMinutes))
        {
            this.mensajeAsunto.innerHTML = "Error: ";
            this.mensajeContexto.innerHTML = "Faltan campos en el campo de tickets";
            return;
        }

        let card = this.ruta.createTicketCard(txtTicketName, txtTickeHour, txtTicketMinutes);
        if(card == null)
        {
            this.mensajeAsunto.innerHTML = "Error: ";
            this.mensajeContexto.innerHTML = "La base no existe";
            return;
        }

        this.mensajeAsunto.innerHTML = "Ticket agregado: ";
        this.mensajeContexto.innerHTML = card;
    }

    _listar = () =>
    {
        this.tabla.innerHTML = this.ruta.list();
    }
}

new App();