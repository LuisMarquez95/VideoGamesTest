import React from 'react'

const Home = () => (
  <div>
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_i9arxzcg.json"  background="transparent"  speed="1"  style={{width: "100%", height: "300px"}}  loop  autoplay></lottie-player>
        </div>
        <div className='col-12'>
          <p className='text-align' style={{"font-family": "Montserrat", "text-align":"center", "font-zise":"18px", "font-weight": "bold"}}>
            Sistema de practica Hova
            sistema basado en la consulta de video juegos con las tecnologias MOngDB, React, Express y NodeJS
          </p>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className='row' style={{"text-align": "-webkit-center"}}>
        <div className='col-6'>
          <div className="card" style={{width: "18rem"}}>
            <img src="https://static.wikia.nocookie.net/esgta/images/1/1b/Car%C3%A1tula_GTA_V.jpg/revision/latest?cb=20130402191528" className="card-img-top" alt="a"/>
            <div className="card-body">
              <h3 style={{"font-family": "Montserrat", "text-align":"center", "font-zise":"20px", "font-weight": "900"}}>Desarrollador con mas juegos</h3>
              <p style={{"font-family": "Montserrat", "text-align":"center", "font-zise":"15pxx", "font-weight": "200"}}>Jhon Wik</p>
              <p className="card-text" style={{"font-family": "Montserrat", "text-align":"center", "font-zise":"15px"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className="card" style={{width: "18rem"}}>
            <img src="https://compass-ssl.xbox.com/assets/b9/0a/b90ad58f-9950-44a7-87fa-1ee8f0b6a90e.jpg?n=XSX_Page-Hero-0_768x792.jpg" className="card-img-top" alt="A"/>
            <div className="card-body">
            <h3 style={{"font-family": "Montserrat", "text-align":"center", "font-zise":"20px", "font-weight": "900"}}>Consolas con mas juegos</h3>
              <p style={{"font-family": "Montserrat", "text-align":"center", "font-zise":"15pxx", "font-weight": "200"}}>XBOX ONE</p>
              <p className="card-text" style={{"font-family": "Montserrat", "text-align":"center", "font-zise":"15px"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Home