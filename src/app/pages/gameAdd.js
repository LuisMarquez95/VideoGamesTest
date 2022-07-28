import React, {Component} from "react";
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
            consol:[],
            _id: '',
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
        
        console.log(JSON.stringify(this.state));
        /*fetch('api/task/saveGame', {
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
        })
        .catch(err => console.error(err));*/
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
        fetch('api/task/findGames')
        .then(res => res.json())
        .then(data => this.setState({games: data}));
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name] : value 
        })
        console.log(e.target.files[0]);
        this.setState({filepreview:URL.createObjectURL(e.target.files[0]), selectedFile: e.target.files[0]}) 
        console.log(this.state.selectedFile);
        let formData = new FormData()
        formData.append('file', JSON.stringify(this.state))
        console.log(formData);
        const response = fetch('api/task/Game/upload', {
        method: 'POST',
        body: formData,
        }).then(res => res.json())
        
    }
   
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={this.addGameNew}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nombre De Video Juego</label>
                                <input type="text" className="form-control" name="title" id="exampleInputEmail1" onChange={this.handleChange} aria-describedby="emailHelp"/>
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
                                <input type="number" className="form-control" name="anu" id="exampleInputEmail1" onChange={this.handleChange} aria-describedby="emailHelp" max={4} maxLength={4}/>
                            </div>
                            <div className="mb-3">
                                <input class="form-check-input" type="checkbox" value="" name="activo" onChange={this.handleChange} id="flexCheckDefault"/>
                                <label class="form-check-label" for="flexCheckDefault">
                                    Activo
                                </label>
                            </div>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Default file input example</label>
                                <input class="form-control" type="file" onChange={this.handleChange} id="formFile" name="imagen"/>
                                <img class="img-preview" src={this.state.filepreview}/>
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" maxLength={300} onChange={this.handleChange} placeholder="Leave a comment here" name="description" id="floatingTextarea2"></textarea>
                                <label for="floatingTextarea2">Descripción</label>
                            </div>
                            <button className="btn btn-primary" type="submit">Guardar Juego</button>
                        </form>
                    </div>
                    <div className="col">
                    <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Vide Juego</th>
                                    <th scope="col">Desarrollador</th>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Información</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.games.map(games => {
                                        return(
                                            <tr key={games._id}>
                                                <td>{games.title}</td>
                                                <td>{games.desarrollador}</td>
                                                <td>{games.imagen}</td>
                                                <td>
                                                    <button className="btn waves-effect waves-light" type="button" onClick={() => this.showGame(games._id)} name="action">
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
        )
    }
}

export default AgregarGame