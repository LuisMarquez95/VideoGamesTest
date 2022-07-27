import React, {Component} from "react";
class APP extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addGame = this.addGame.bind(this);
    }
    addGame(e){
        fetch('api/task', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(res => console.log(res))
        .then(data => {
            M.toast({html: 'Juego guardado'});
            this.setState({title: "", description: ""});
        })
        .catch(err => console.error(err));

        e.preventDefault();
    }
    componentDidMount(){
        this.fetchGames();
    }
    fetchGames(){
        fetch('api/task')
        .then(res => res.json())
        .then(data => console.log(data));
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
                {/*  NAVIGATION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/"> HOVA VIDEO GAME TEST</a>
                    </div>
                </nav>
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
                                            <i className="material-icons prefix">border_color</i>
                                            <input name="description" type="text" onChange={this.handleChange} className="autocomplete" value={this.state.description}/>
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
                                <table>
                                </table>  

                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}
export default APP;
