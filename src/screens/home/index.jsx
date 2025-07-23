import React,{Component,Fragment} from 'react';
import ItemsPage from '../../app/components/product';
import Welcome from '../../screens/welcome';
import Login from '../login';

export default class Home extends Component{
    render(){
        return(
            <div><Login></Login></div>
        )
    }
    // render(){
    //     return(
    //         <div><Login></Login></div>
    //     )
    // }
}