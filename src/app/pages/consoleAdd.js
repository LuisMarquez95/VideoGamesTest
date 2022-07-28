import React, {Component} from "react";
class AgregarConsola extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            devs: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addGame = this.addGame.bind(this);
    }
    addGame(e){
        if(this.state.title == ""){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes ingresar un nombre de Consola'
              })
        }else{
            if(this.state._id){
                fetch(`api/task/UpdateDevById/${this.state._id}`,{
                    method: 'PUT',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data  => {
                    M.toast({html: 'Registro Actualizado'})
                    this.setState({title: "", _id: ""});
                    this.fetchDevs();
                })
            }else{
                fetch('api/task/postConsole', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => console.log(res))
                .then(data => {
                    M.toast({html: 'Consola Agregada'});
                    this.setState({title: "", _id: ""});
                    this.fetchDevs();
                })
                .catch(err => console.error(err));
            }
        }
        e.preventDefault();
    }
    componentDidMount(){
        this.fetchDevs();
    }
    fetchDevs(){
        fetch('api/task/findConsole')
        .then(res => res.json())
        .then(data => this.setState({devs: data}));
    }

    deleteDev(id){

        Swal.fire({
            title: 'Quieres eliminar el registro?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `No Eliminar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(`/api/task/deleteDev/${id}`,{ 
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Dev Eliminado'});
                    this.fetchDevs();
                })
            } else if (result.isDenied) {
              Swal.fire('Usuario no eliminado', '', 'info')
            }
          })
        
    }

    updateDev(id){
        fetch(`/api/task/searchDevById/${id}`)
        .then(res => res.json())
        .then(data => {
           this.setState({
            title: data.title,
            _id: data._id
           })
        })
    }





    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name] : value 
        })
        console.log(e.target.name);

    }
    render(){
        return (
            <div>
               
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.addGame}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">gamepad</i>
                                            <input name="title" type="text" onChange={this.handleChange} className="autocomplete" value={this.state.title}/>
                                        </div>
                                        
                                        <div className="input-field col s12">
                                            <button type="submit" className="btn waves-effect waves-light">
                                                <i className="material-icons right">cloud</i>Guardar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div>
                                
                            </div>

                            
                        </div>
                    
                    </div>
                    <div className="col s7">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.devs.map(devs => {
                                                return(
                                                    <tr key={devs._id}>
                                                        <td>{devs.title}</td>
                                                        
                                                    </tr>
                                                )
                                            })
                                        }
                                    
                                    
                                    </tbody>
                                </table>
                            </div>
                </div>
            </div>
        )
    }
}

export default AgregarConsola