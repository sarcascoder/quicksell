import Button from '../components/Button';
import React from 'react';
import MainLayout from '../components/MainLayout';
import {useState} from 'react';


const Home = () => {
    const [data, setdata] = useState();

    const manageData = (data)=>{
       setdata(data);
       console.log(data);
    };

    return (
        <div className='home-wrapper'>
            <Button manageData = {manageData}/>
            <MainLayout data={data}/>
        </div>
    )
}

export default Home
