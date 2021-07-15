import React,{Component} from 'react'
import Header from '../../common/header/Header'

class Home extends Component{
    
    searchImage = (searchImageCaption) => {
        console.log(searchImageCaption)
    }

    render(){
        return(
            <Header {...this.props} baseUrl={this.props.baseUrl} searchImage={this.searchImage} />
        )
    }
}
export default Home;