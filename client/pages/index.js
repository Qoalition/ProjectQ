import React, { Component } from 'react'
import Head from 'next/head';
import Stars from '../components/Stars';
import IntialModal from '../components/InitialModal';
import Input from '../components/Input';
import axios from 'axios';
import InitialModal from '../components/InitialModal';
class Home extends Component {

  state = {
    modal : true
  }
    static async getInitialProps() {
      let dbData;
      try {
        let results = await axios.get('http://localhost:3001/getWishes');
        dbData = results.data;
        console.log(dbData)

      } catch(e) {
        console.log('error fetching initial props',  e)
      }
      return { dbData };
    }
  render() { 
 
    return ( 
      <div>
      <Head>
      <title>SpaceHash</title>
        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />
      </Head>
      <InitialModal
        show={this.state.modal}
        onHide={() => this.setState({
          modal: false
        })}
      />
      <Stars dbData={this.props.dbData}/>
        <Input /> 
          <div className="stars"></div>
          <div className="twinkling"></div>
          <div className="clouds"></div>
      </div>
     );
  }
}
 
export default Home
