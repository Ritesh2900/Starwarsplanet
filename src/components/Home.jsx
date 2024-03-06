import React, { useState, useEffect } from 'react'
import "../components/css/main.css"
import LoadingBar from 'react-top-loading-bar'
function Home() {
    const [data, setData] = useState([]);
    const [progress, setProgress] = useState(0)
    // code for making function to call api
    const fetchAPI = async (apiURL) => {
        setProgress(20);
        let callAPI = await fetch(apiURL, {
            method: "GET",
        })
        setProgress(50);
        // code for getting the result
        if (callAPI) {
            setProgress(70)
            callAPI = await callAPI.json();
            setProgress(100)
            setData(callAPI.results);
        }
    }

    // code for calling the useeffect
    useEffect(() => {
        fetchAPI("https://swapi.dev/api/planets/?format=json");
    }, []);
    return (
        <>
            <div className='flex flex-col h-[100%] lg:h-lvh bg-gradient-to-br from-[rgb(12,31,39)] to-[rgb(10,15,24)] w-full items-center lg:justify-center'>
                <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
                <h1 className='text-center text-white text-3xl mt-3 font-semibold my-1'> Star Wars Planets Directory</h1>
                {/* code for making cards */}
                <div className="flex w-[90%] m-auto flex-wrap my-3 justify-center xl:justify-start">
                    {/* making cards */}
                    {data.map((data, index) => (
                        <div className="w-56 mx-3  h-56 my-2 flex justify-center items-center flex-col text-white mainContainer" key={index}>
                            <div>
                                <p><span className='text-orange-400 font-semibold'>Name : </span>{data.name}</p>
                                <p><span className='text-orange-400 font-semibold'>Climate : </span>{data.climate}</p>
                                <p><span className='text-orange-400 font-semibold'>Population :</span> {data.population}</p>
                                <p><span className='text-orange-400 font-semibold'>Gravity : </span>{data.gravity}</p>
                                <p><span className='text-orange-400 font-semibold'>Population : </span>{data.population}</p>
                                <p><span className='text-orange-400 font-semibold'>Population : </span>{data.diameter}</p>

                            </div>
                        </div>
                    ))}


                </div>
                {/* // code for pagination */}
                <nav aria-label="Page navigation example" className='my-2'>
                    <ul className="pagination">
                        <li className="page-item hover:cursor-pointer" onClick={() => { fetchAPI("https://swapi.dev/api/planets/?format=json") }} >
                            <a className="page-link" aria-label="Previous" >
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>

                        <li className="page-item hover:cursor-pointer" onClick={() => { fetchAPI("https://swapi.dev/api/planets/?page=2&format=json") }}>
                            <a className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Home
