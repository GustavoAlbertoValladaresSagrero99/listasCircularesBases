export default class Route
{
    constructor()
    {
        this.inicio = null;
    }


    addBase(nuevo)
    {
        if(this.inicio == null)
        {
            this.inicio = nuevo;
            this.inicio.next = this.inicio;
            this.inicio.previous = this.inicio;
            return nuevo;
        }else if (this.searchByName(nuevo.getName() == null))
        {
            let temp=this.inicio;
            while(temp.next != this.inicio){
                temp = temp.next;
            }
            temp.next = nuevo;
            nuevo.previous = temp;
            nuevo.next = this.inicio;
            this.inicio.previous = nuevo;
            return nuevo;
        }

        return null;

    }

    list()
    {
        if(this.inicio == null)
        {
            return null;
        }
        
        return this.addQueue(this.inicio);
    }

    addQueue(temp)
    {
        if (temp.next == this.inicio)
        {
            return temp.getInfo();
        }
        return temp.getInfo() + this.addQueue(temp.next);
    }

    deleteByName(name)
    {
        if(this.inicio == null)
        {
            return null;
        }

        let temp = null;
        if(this.inicio.getName() == name)
        {
            if(this.inicio.getName() != this.inicio)
            {
                temp = this._inicio;
                this.inicio.previous.next = this.inicio.next;
                this.inicio.next.previous = this.inicio.previous;
                this.inicio = this._inicio.getNext();
                temp.next = null;
                temp.previous = null;
                return temp;
            }else
            {
                temp = this.inicio;
                this.inicio = null;
                return temp;  
            }
        }else
        {
            let aux = this.inicio.next;
            while(aux != this.inicio)
            {
                if(aux.getName() == name)
                {
                    temp = aux;
                    aux.previous.next = aux.next;
                    aux.next.previous = aux.previous;
                    temp.next = null;
                    temp.previous = null;
                    return temp;
                }

                aux = aux.next;
            }

            return temp;
        }

    }



    createTicketCard(base, hour, minutes)
    {
        let movimiento = `Estas en la base ${base} - tu hora de inicio es ${hour}:00 - el tiempo de recorrido será ${minutes} -> siguiente parada ${base.next}`;
        let baseInicio = this.searchByName(base);
        if(baseInicio != null)
        {
            let temp = baseInicio.next;
            while(minutes > 0)
            {
               let duration = Number(temp.getDuration());
               minutes -= duration;
               if(minutes < 0)
               {
                return movimiento;
               }else
               {
                   temp = temp.next;
               }
            }
            return movimiento;
        }

        return null;
    }

    searchByName(name)
    {
        let temp = this.inicio;
        if(temp.getName() == name)
        {
            return temp;
        }else
        {
            temp = temp.next;
            while(temp != this.inicio)
            {
                if(temp.getName() == name)
                {
                    return temp;
                }else
                {
                    temp = temp.next;
                }
            }

        }

        return null;
    }
}