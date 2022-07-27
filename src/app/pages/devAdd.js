import React, {Component} from "react";
class DevE  extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            devs: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addGame = this.addGame.bind(this);
    }
    addGame(e){
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
            M.toast({html: 'Desarrollador Agregado'});
            this.setState({title: "", description: ""});
            this.fetchDevs();
        })
        .catch(err => console.error(err));

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
                                            <i className="material-icons prefix">airplay</i>
                                            <input name="title" type="text" onChange={this.handleChange} className="autocomplete" value={this.state.title}/>
                                        </div>
                                        
                                        <div className="input-field col s12">
                                            <button type="submit">
                                                <a className="waves-effect waves-light btn-large"><i className="material-icons right">cloud</i>Salvar</a>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div>
                                
                            </div>

                            <div className="col s7">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.devs.map(devs => {
                                                return(
                                                    <tr>
                                                        <td>{devs.title}</td>
                                                        <td>Eclair</td>
                                                        <td>$0.87</td>
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
        )
    }
}
export  default DevE