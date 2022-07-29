import React, {Component} from "react";
import axios from 'axios';

const FormData = require('form-data');
class AgregarGame extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description:'', 
            desarrollador:'',
            anu:'',
            consolas:'',
            imagen: '',
            activo:'',
            devs: [],
            games:[],
            gameInfo:[],
            consol:[],
            _id: '',
            editar: 0,
            filepreview: null,
            selectedFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.addGameNew = this.addGameNew.bind(this);
       
    }
  
    componentDidMount(){
        this.fetchGames();
        this.fetchConsolas();
        this.fetchDevs();
    }
    addGameNew(e){
        
      if(this.state._id){

            const formData = new FormData();
            formData.append("file", this.state.selectedFile);
            formData.append("fileName", this.state.selectedFile.name);
            axios.post(
                "api/task/Game/upload",
                formData
              ).then(res => {
               this.setState({imagen:res.data.name});
               
               fetch(`api/task/UpdateGamesById/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
                })
                .then(res => res.json())
                .then(data  => {
                
                    this.setState({title: "",
                        _id: "",
                        description: "",
                        anu: "",
                        activo: ""});
                    this.fetchDevs();
                    this.fetchGames();
                    this.fetchConsolas();
                    Swal.fire('Juego editado', '', 'success')
                })
        
            });
            
        }else{
            const formData = new FormData();
            formData.append("file", this.state.selectedFile);
            formData.append("fileName", this.state.selectedFile.name);
            axios.post(
                "api/task/Game/upload",
                formData
              ).then(res => {
               this.setState({imagen:res.data.name});
              
               fetch('api/task/saveGame', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => console.log(res))
                .then(data => {
                    
                    this.setState({title: '',
                    description:'', 
                    desarrollador:'',
                    anu:'',
                    consolas:'',
                    imagen:'',
                    activo:'', _id: ""});
                    this.fetchGames();
                    Swal.fire('NUEVO JUEGO AGREGADO', '', 'success')
                })
                .catch(err => console.error(err));
    
            });
        }
       
        e.preventDefault();
    }
    
    showGame(e){
        
    }

    fetchDevs(){
        fetch('api/task/findDev')
        .then(res => res.json())
        .then(data => this.setState({devs: data}));
    }
    fetchConsolas(){
        fetch('api/task/findConsole')
        .then(res => res.json())
        .then(data => this.setState({consol: data}));
    }
    fetchGames(){
        fetch('api/task/finQueryDevel')
        .then(res => res.json())
        .then(data => this.setState({games: data}));
    }

    handleChange(e){
        const {name, value} = e.target;
        
        this.setState({
            [name] : value 
        })
        console.log(e.target.value);
        if(e.target.name == 'activo'){
             
            if(this.state.activo == ''){
                this.setState({activo: "1"})
            }else{
                this.setState({activo: "0"})
            }
        }else if(e.target.name == 'file'){
            this.setState({filepreview:URL.createObjectURL(e.target.files[0]), selectedFile: e.target.files[0]}) 

        }
        
    }
    getDev(a){
        fetch(`api/task/searchDevById/${a}`)
        .then(res => { console.log(res.data.title); return  data.title});
    }
    showInfoGame(idGame){
        fetch(`/api/task/findQueryGameInfo/${idGame}`)
        .then(res => res.json())
        .then(data => {
            this.setState({gameInfo: data, editar: 1}) 
            console.log(this.state.gameInfo)
        });
    }

    /*Borrar */
    deleteDev(id){

        Swal.fire({
            title: 'Quieres eliminar el juego?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `No Eliminar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(`/api/task//deleteGame/${id}`,{ 
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire('Juego eliminado', '', 'success')
                    this.fetchGames();
                    this.fetchConsolas();
                    this.fetchDevs();
                })
            } else if (result.isDenied) {
              Swal.fire('Juego no eliminado', '', 'info')
            }
          })
    }


    updateGame(id){
        fetch(`/api/task/searchGameById/${id}`)
        .then(res => res.json())
        .then(data => {
           this.setState({
            title: data.title,
            _id: data._id,
            description: data.description,
            anu: data.anu,
            activo: data.activo
           })
           console.log(data)
        })

    }
    filtrarJuego(id, title, anu){
        console.log(title)
        fetch(`/api/task/findGmaesFilter/${id}/${title}/${anu}`)
        .then(res => res.json())
        .then(data => {
           this.setState({games: data})
           console.log(data)                                      
        })

    }
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row" style={{"margin-top":"2%"}}>
                        <div className="col-10">

                        </div>
                        <div className="col-1">
                            <button type="button" style={{background: "transparent", border: "none"}}  data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_XyWejw.json"  background="transparent"  speed="1"  style={{width: "100%", height: "100px"}}  loop  autoplay></lottie-player>
                            </button>
                        </div>
                        <div className="col-1">
                            <button type="button" style={{background: "transparent", border: "none"}} data-bs-toggle="modal" data-bs-target="#exampleModalInfoUpdate">
                            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_4cntnmut.json"  background="transparent"  speed="1"  style={{width: "100%", height: "100px"}}  loop  autoplay></lottie-player>
                            </button>
                        </div>
                    </div>
                    <div className="row" style={{"text-align": "-webkit-center", "margin-top":"2%"}}>
                        <div className="col-12">
                            <h3 style={{"font-family": "Montserrat", "text-align":"center", "font-zise":"20px", "font-weight": "bold"}}>Video Juegos Registrados</h3>
                            <table className="table table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Vide Juego</th>
                                        <th scope="col">Desarrollador</th>
                                        <th scope="col">Consola</th>
                                        <th scope="col">Eliminar</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.games.map(games => {
                                            return(
                                                <tr key={games._id}>
                                                    <td style={{cursor:"pointer"}}>
                                                        <button type="button" onClick={() => this.showInfoGame(games._id)} style={{background: "transparent", border: "none"}}  data-bs-toggle="modal" data-bs-target="#exampleModalInfo">
                                                            {games.title}
                                                        </button>
                                                    </td>
                                                    <td>{games.devs.title}</td>
                                                    <td>{games.consol.title}</td>
                                                    <td>
                                                        <button className="btn btn-warning" type="button" onClick={()=> this.deleteDev(games._id)} name="action">
                                                            <i className="material-icons right">clear</i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-info" type="button" onClick={()=> this.updateGame(games._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" name="action">
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
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                    <p>Agregar un Video Juego</p>
                            </div>
                            <form onSubmit={this.addGameNew}>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Nombre De Video Juego</label>
                                    <input type="text" value={this.state.title}  className="form-control" name="title" id="exampleInputEmail1" onChange={this.handleChange} aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" onChange={this.handleChange} name="desarrollador">
                                        <option selected disabled>Selecciona un Desarrollador</option>
                                        {this.state.devs.map(devs =>(<option key={devs._id} value={devs._id}>{devs.title}</option>))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select className="form-select" aria-label="Default select example" onChange={this.handleChange} name="consolas">
                                        <option selected disabled>Selecciona una Consola</option>
                                        {this.state.consol.map(consol =>(<option key={consol._id} value={consol._id}>{consol.title}</option>))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Año</label>
                                    <input type="number"  className="form-control" name="anu" id="exampleInputEmail1" onChange={this.handleChange} aria-describedby="emailHelp"  maxLength={4}/>
                                </div>
                                <div className="mb-3">
                                    <input class="form-check-input" value={1} type="checkbox"  name="activo" onChange={this.handleChange} id="flexCheckDefault"/>
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Activo
                                    </label>
                                </div>
                                <div class="mb-3">
                                    <label for="formFile" class="form-label">Default file input example</label>
                                    <input class="form-control" type="file" onChange={this.handleChange} id="formFile" name="file"/>
                                    <img class="img-preview" style={{width: "50%"}} src={this.state.filepreview}/>
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" value={this.state.description}  maxLength={300} onChange={this.handleChange} placeholder="Leave a comment here" name="description" id="floatingTextarea2"></textarea>
                                    <label for="floatingTextarea2">Descripción</label>
                                </div>
                                <button className="btn btn-primary" type="submit">Guardar Juego</button>
                                </form>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModalInfo" tabindex="-1" aria-labelledby="exampleModalInfoLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p>Información de Video Juego</p>
                            </div>
                            {
                                        this.state.gameInfo.map(games => {
                                            return(
                                                <form id={games._id}>
                                        
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Año</label>
                                                        <input type="text" className="form-control" name="anu"  aria-describedby="emailHelp" value={games.anu} readOnly={true}/>
                                                    </div> 
                                                    <div className="mb-3">
                                                        <textarea className="form-control" maxLength={300} readOnly={true} placeholder="Leave a comment here" name="description" id="floatingTextarea2" value={games.description}></textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" class="form-label">Imagen</label><br></br>
                                                        <img class="img-preview" style={{width: "50%"}} src={`/files/${games.imagen}`}/>
                                                    </div>
                                                </form>
                                               
                                            )
                                        })
                            }
                                          
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="exampleModalInfoUpdate" tabindex="-1" aria-labelledby="exampleModalInfoUpdateLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p>Filtrar Información</p>
                            </div>
                            <div className="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Nombre De Video Juego</label>
                                            <input type="text" className="form-control"  name="title" id="exampleInputEmail1" onChange={this.handleChange} aria-describedby="emailHelp"/>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select" aria-label="Default select example" onChange={this.handleChange} name="desarrollador">
                                                <option selected disabled>Selecciona un Desarrollador</option>
                                                {this.state.devs.map(devs =>(<option key={devs._id} value={devs._id}>{devs.title}</option>))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">AÑO</label>
                                            <input type="text" className="form-control"  name="title" id="exampleInputEmail1" onChange={this.handleChange} aria-describedby="emailHelp"/>
                                        </div>
                                        
                                        <button className="btn btn-primary" onClick={()=> this.filtrarJuego(this.state.desarrollador, this.state.title, this.state.anu)}>Filtrar</button>
                                          
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AgregarGame