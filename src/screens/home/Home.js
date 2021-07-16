import React, { Component } from 'react'
import Header from '../../common/header/Header'

class Home extends Component {

    searchImage = (event) => {
        let searchImage = event.target.value
        console.log(searchImage)
    }


    render() {
        return (
            <div>
                <Header {...this.props} baseUrl={this.props.baseUrl} searchImage={this.searchImage} />

            </div>
        )
    }
}
export default Home;