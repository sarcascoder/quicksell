import React, { useEffect, useState } from 'react'
import adjust from '../Assets/Display.svg'
import carret from '../Assets/down.svg'
import axios from 'axios'
const Button = ({manageData}) => {
  const [ishidden, setishidden] = useState(true);
  const [grouped, setGrouped] = useState('Select');
  const [ordered, setOrdered] = useState('Select');
  const [APIdata, setData] = useState([]);
  const handleCollapse = () => {
    const element = document.querySelector('.options');
    element.classList.remove('hidden');
    setishidden(false);

  }
  const handleCollapse1 = () => {
    const element = document.querySelector('.options');
    const contains = element.classList.contains('hidden');
    if (!contains) {
      element.classList.add('hidden')
      setishidden(true);
    }
  }
 
  const compositeKeyTouser = {};
  const priorityTocompositekey = {};
  const groupedUsers = {};
  const orderedArray = [];
  const compositeArray = [];
  const compositekeyToIndex = {};

  const compositeKeyToUserTitle = {};
  const titleTocompositekey = {};
  const groupedUsersbyTitle = {};
  const orderedArrayByTitle = [];
  const compositeArraybyTitle = [];
  const compositekeyToIndexbyTitle = {};

  const resarr = {};
  var userMetaData = {}; 
  // var changed = false;
  // const [reload, setreload] = useState(false);
  useEffect(() => {
    const data1 = JSON.parse(window.localStorage.getItem('GROUPING'));
    const data2 = JSON.parse(window.localStorage.getItem('ORDERING'));
 
      setGrouped(data1);
      setOrdered(data2);


    return () => {
      
    };
  }, []);

  useEffect(() => {
    const formattingData = () => {
    
      APIdata[0]?.users.forEach((dataItem,indx)=>{
           userMetaData[dataItem.id] = [{name:dataItem.name,available:dataItem.available}];
      })
      if (grouped !== '') {
        APIdata[0]?.tickets.forEach((element, indx) => {
          var filter; 
          if(grouped==='Priority') filter = element.priority;
          else if(grouped==='User') filter = element.userId;
          else filter = element.status;
         
          if (!groupedUsers[filter]) groupedUsers[filter] = [element.id + element.priority];
          else groupedUsers[filter].push(element.id + element.priority);
          if (!priorityTocompositekey[element.priority])
            priorityTocompositekey[element.priority] = [element.id + element.priority];
          else
            priorityTocompositekey[element.priority].push(element.id + element.priority);
            compositeKeyTouser[element.id + element.priority] = [element.userId];
            compositekeyToIndex[element.id + element.priority] = indx;
          orderedArray.push(element.priority);
          // orderedArrayByTitle.push(element.title);


          if (!groupedUsersbyTitle[filter]) groupedUsersbyTitle[filter] = [element.id + element.title];
          else groupedUsersbyTitle[filter].push(element.id + element.title);
          if (!titleTocompositekey[element.title])
            titleTocompositekey[element.title] = [element.id + element.title];
          else
            titleTocompositekey[element.title].push(element.id + element.title);
          // if(!compositeKeyToUserTitle[element.id + element.title]) 
            compositeKeyToUserTitle[element.id + element.title] = [element.userId];
          // else compositeKeyToUserTitle[element.id + element.title].push(element.userId);
  // if(!compositekeyToIndex[element.id + element.title])
            compositekeyToIndexbyTitle[element.id + element.title] = indx;
          // else compositekeyToIndex[element.id + element.title].push(indx);
          // orderedArray.push(element.priority);
          orderedArrayByTitle.push(element.title);
        })
        // console.log(compositekeyToIndexbyTitle)
        orderedArray.sort((a,b)=>{return b-a;})
        orderedArrayByTitle.sort();
        // orderedArrayByTitle.reverse();
        // console.log(orderedArrayByTitle)
        // console.log(orderedArray);
        // console.log(compositekeyToIndex)
        // console.log(compositeKeyTouser)
        // console.log(groupedUsers,'grouped-users')
      }
      if (ordered !== '') {
        if (ordered === 'Priority') {
          orderedArray.forEach(element => {
            compositeArray.push(priorityTocompositekey[element].at(-1));
            priorityTocompositekey[element].pop();
          });
          // console.log(compositeKeyTouser,'compositekeytouser');
          // console.log(compositeArray,'composite');
          for(let key in groupedUsers){
            // console.log(compositeArray)
            // console.log(groupedUsers)
            compositeArray.forEach((element,indx) => {
              if(groupedUsers[key].includes(element)) {
                if(!resarr[key]) resarr[key] = [compositekeyToIndex[element]];
                else resarr[key].push(compositekeyToIndex[element]);
              }
            });
            
          }
          // console.log(compositeKeyTouser)
          // console.log(resarr);final res data
        }
        else {
          orderedArrayByTitle.forEach((element)=>{
            compositeArraybyTitle.push(titleTocompositekey[element].at(-1));
            titleTocompositekey[element].pop();
          });
          for(let key in groupedUsersbyTitle){
            // console.log(compositeArray)
            // console.log(groupedUsers)
            compositeArraybyTitle.forEach((element,indx) => {
              if(groupedUsersbyTitle[key].includes(element)) {
                if(!resarr[key]) resarr[key] = [compositekeyToIndexbyTitle[element]];
                else resarr[key].push(compositekeyToIndexbyTitle[element]);
              }
            });
            
          }
            // console.log(resarr)
        }
      }

    }

    formattingData();
    window.localStorage.setItem('GROUPING',JSON.stringify(grouped));
    window.localStorage.setItem('ORDERING',JSON.stringify(ordered));
    manageData({resarr,userMetaData,APIdata,grouped})
    // console.log(mapping1, sorted_mapping)
    return () => {
      // changed = false;
    };
  }, [grouped, ordered, APIdata]);


 



  // if(reload) manageData({resarr,userMetaData,APIdata,grouped})
 

  const handleOrdering = (event) => {
    setOrdered(event.target.value);
  }

  const handleGrouping = async (event) => {
    setGrouped(event.target.value)
  }

 

 
 

  // console.log(data[0]?.tickets.forEach(element => {
  //   console.log(element)
  // }));
  useEffect(() => {
    const API = 'https://api.quicksell.co/v1/internal/frontend-assignment ';

    axios.get(API).then(res => {setData([res.data]); console.log(res)}).catch(error => alert(error));


  }, []);

  
 
  
  
  return (
    <div className='header-part'>
    <div className='btn' onClick={() => { if (ishidden) handleCollapse(); }}>
        <img src={adjust} alt='' className='adjust-icon' />
        <h4>Display</h4>
        <img src={carret} alt='' />
        <div className='options hidden'>
          <div className='grouping'>
            <p>Grouping</p>
            <select onChange={handleGrouping}>
              <option>Select</option>
              <option >Status</option>
              <option >User</option>
              <option >Priority</option>
            </select>
          </div>
          <div className='ordering'>
            <p>Ordering</p>
            <select onChange={handleOrdering}>
              <option>Select</option>
              <option>Priority</option>
              <option>Title</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className='display-div' onMouseEnter={() => { handleCollapse1()}}></div>
    </div>
  )
}

export default Button
