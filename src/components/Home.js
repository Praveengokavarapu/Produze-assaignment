import { useState,useEffect } from "react";

import SuggestionItem from "./SuggestionItem";

import { CiSearch } from "react-icons/ci";

import { Circles } from "react-loader-spinner";



const Home=(props)=> {

    const [searchInput,setsearchInput]=useState('');
    const [weatherData,setweatherData]=useState({});
    const [progress,setprogress]=useState('');
    const [suggestionClicked,setsuggestionClicked]=useState(false)


    //updating the state whenever the user clicks on a particular suggestion and calling the function which makes https request
    const updateSearch = value => {
        setsearchInput(value)
        
        setsuggestionClicked(true)
    }

    useEffect(()=>{
        if (suggestionClicked){
            onGetWeatherDetails()
        }
    },[suggestionClicked])

    //function which makes the http request and response will be stored in th state(weatherData)
    const onGetWeatherDetails = async () => {
        setprogress("InProgress")
        
        const apiurl1 = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=9833f9a5720200f955c214372952e372`
        const options = { method: "GET" }
        const response1 = await fetch(apiurl1, options);
        if (response1.ok === true) {
            const data = await response1.json();
            const lat = data[0].lat
            const lon = data[0].lon
            const apiurl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9833f9a5720200f955c214372952e372`
            const response2 = await fetch(apiurl2, options)
            if (response2.ok === true) {
                const data2 = await response2.json()
                console.log(data2)
                const weatherdata = { temp: data2.main.temp, humidity: data2.main.humidity, pressure: data2.main.pressure, city: data2.name }
               setweatherData(weatherdata)
               setsearchInput('')
               setprogress('Success')
               setsuggestionClicked(false)
            }
            else {
                setprogress("Failure")

            }
        }
        else {
            setprogress("Failure")
        }
    }

    const onChangeSearchInput = event => {
        setsearchInput(event.target.value)
    }

    
    const retry = () => {
        onGetWeatherDetails()
    }
    //for handling errors
    const onFailureView = () => {
        return <div>
            <h1>Oops! Something went Wrong</h1>
            <button onClick={retry}>Retry</button>
        </div>
    }

    //will be called in the time loading
    const onLoadingView = () => {
        return <div>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }

    //Success view
    const onSuccessView=()=>{
        
        const temp=parseInt(weatherData.temp)-273;
        const {humidity,pressure,city}=weatherData;
        return(
            <div className="flex flex-col content-start md:p-10 md:m-10 sm:p-2 sm:m-2  bg-white rounded-md">
                <div>
                    <h1 className=" md:text-3xl sm:text-xl font-bold font-sans">{city}</h1>
                </div>
                <div className="flex md:p-5 sm:p-2 justify-between w-full">
                    <div className="flex flex-col place-content-center">
                        {temp>20?<img className="w-28 p-2" src="https://i.pinimg.com/originals/d5/cf/12/d5cf12d6f7b25ae1d78dd18d2a46c690.png" alt="sunny"/>:<img src="https://static.vecteezy.com/system/resources/thumbnails/009/385/577/small/white-cloud-clipart-design-illustration-free-png.png" className="w-28" alt="cool"/>}
                        <h1 className="md:text-2xl font-bold">{temp} C</h1>
                    </div>
                    <div className="flex flex-col place-content-center  m-2 p-2 ">
                        <p>Humidity : {humidity} %</p>
                        <p>Pressure : {pressure} hPa</p>
                    </div>
                </div>

            </div>
        )
    }

    //function for rendering the result
    const onRenderDetails=()=>{
        
        switch (progress){
            case "Failure":
                return onFailureView()
            case "InProgress":
                return onLoadingView()
            case "Success":
                 return onSuccessView()
            default:
                return <div className="p-10 m-10 text-white flex place-items-center flex-col rounded-lg border-2">
                    <h1 className="text-2xl font-sans text-white font-bold">Popular Searches:</h1>
                    <p>Hyderabad</p>
                    <p>Chennai</p>
                    <p>Mumbai</p>
                </div>;
        }
    }


    
        const { suggestionsList } = props;
        

        //for suggestions based on the search Input
        let searchResults = suggestionsList.filter(each =>
            each.suggestion.toLowerCase().includes(searchInput.toLowerCase())
        )

        //if the search input is empty
        if (searchInput === "") {
            searchResults = []
        }

        return (
            <div className="flex flex-col pt-10 font-sans place-items-center bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
                <div className="flex">
                    <h1 className="text-2xl  font-bold text-white">Weather</h1>
                </div>
                <div className="flex flex-col bg-white p-2 m-5 border-2 place-items-center md:w-96 sm:w-32">
                    <div className="flex place-items-center justify-start w-full">
                        <CiSearch />
                        <input type="search" placeholder="Search" onChange={onChangeSearchInput} value={searchInput} className="outline-0 w-full" />
                    </div>
                    <ul className="bg-white w-full">
                        {searchResults.map(each => (
                            <SuggestionItem suggestionDetails={each} key={each.id} updateSearch={updateSearch} />
                        ))}
                    </ul>
                </div>
                <div>
                    {onRenderDetails()}
                </div>

            </div>
        )
    }


export default Home