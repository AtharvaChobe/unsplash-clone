"use client"
import React, { useEffect, useState } from 'react';
import {BsSearch} from 'react-icons/bs'


const Page = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [num, setNum] = useState(1);
  const [orientation, setorientation] = useState("landscape")

  const fetchData = () => {
    fetch(`https://api.unsplash.com/search/photos/?client_id=05DGzSYoVclb0XFyYvTh41oRfAN70kLV8HnYe_vTzog&query=${input}&per_page=20&page=${num}&orientation=${orientation}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.results);
        // console.log(data.results);
        const loadMore = document.getElementById("load_button");
        loadMore.style.display = "block";
      });
  };

  return (
    <>
    {/* Jumbotron */}
      <div className="flex items-center flex-row flex-wrap justify-evenly py-3 px-1 bg-slate-300 w-[100vw]">
        <span className='flex items-center my-2'>
        <img className='w-16 h-16' src="https://veerle.duoh.com/images/design/_squareNormal/unsplash.png" alt="" />
        <h1 className='font-bold text-3xl ml-1 items-center'>Unsplash</h1>
        </span>
        <div className="flex flex-row items-center my-s">
          <input className='py-1 px-1 text-xl rounded-md' placeholder='Search an image...' type="text" value={input} onChange={(e) => { setInput(e.target.value) }} />
          <button className='text-xl px-7 py-1' onClick={() => { fetchData(); }}> <BsSearch/> </button>
        </div>
        <select
            className='text-lg px-3 py-2 rounded my-2'
            value={orientation}
            onChange={(e) => setorientation(e.target.value)}
          >
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="squarish">Squarish</option>
          </select>
      </div>

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-[90%] p-7 mx-[5%]'>
        {
          results.map((item) => (
            
            <a target="_blank" href={item.links.html}><img key={item.id} src={item.urls.regular} alt="" /></a>
              

            
          ))
        }
      </div>
      
      <button
        id='load_button'
        className='bg-black text-white text-xl m-4 px-3 py-1 hidden text-center mx-auto'
        onClick={() => {
          setNum((prevNum) => prevNum + 1);
          fetchData();
        }}
      >
        Load more
      </button>
    </>
  );
};

export default Page;
