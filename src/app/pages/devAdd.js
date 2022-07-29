import React, {Component} from "react";
class DevE  extends Component{
    
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
                text: 'Debes ingresar un nombre de desarrollador'
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
                   
                    this.setState({title: "", _id: ""});
                    this.fetchDevs();
                })
            }else{
                fetch('api/task/postDevel', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => console.log(res))
                .then(data => {
                    Swal.fire('Desarrollador Agregado');
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
        fetch('api/task/findDev')
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
                    Swal.fire('Usuario eliminado', '', 'success')
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
                
                <div className="container-fluid" style={{"margin-top": "5%"}}>
                    <div className="row" style={{"text-align": "-webkit-center"}}>
                    <div className='col-6'>
                        <div className="card" style={{width: "18rem"}}>
                            <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_znokougu.json"  background="transparent" className="card-img-top" speed="1"  style={{"width": "100%", "height": "200px"}}  loop  autoplay></lottie-player>
                            <div className="card-body">
                                   <h3> Dar de alta un desarrollador</h3> 
                                    <form onSubmit={this.addGame}>
                                        <div className="row">
                                            <div className=" col-12">
                                                <label style={{"font-family": "Montserrat"}}> Nombre del desarrollador</label>
                                                <input name="title" type="text" onChange={this.handleChange} className="form-control" value={this.state.title}/>
                                            </div>
                                            
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-success" style={{"margin-top":"2%"}}>
                                                    Guardar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                            <div className="card" style={{width: "18rem"}}>
                                <div className="card-body">
                                    <label style={{"font-family": "Montserrat"}}> Desarrolladores Registrados</label>
                                    <table className="table table-sm table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Eliminar</th>
                                                <th>Editar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.devs.map(devs => {
                                                    return(
                                                        <tr key={devs._id}>
                                                            <td>{devs.title}</td>
                                                            <td>
                                                                <button className="btn btn-warning" type="button" onClick={()=> this.deleteDev(devs._id)} name="action">
                                                                    <i className="material-icons right">clear</i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-info" type="button" onClick={() => this.updateDev(devs._id)} name="action">
                                                                    <i className="material-icons right">create</i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export  default DevE