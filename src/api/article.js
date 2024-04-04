import axios from "axios"


const RapidAPI_Key = import.meta.env.VITE_RAPID_API_KEY

import state from "../store"


export const Summurizer= async (url)=>
{

   try {
    const response = await axios.get(`https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(url)}&length=3&lang=${state.lang}`,
       {
        headers:{
          'X-RapidAPI-Key': RapidAPI_Key,
          'X-RapidAPI-Host': "article-extractor-and-summarizer.p.rapidapi.com"
        }
       }
    );
        return response
   } catch (error) {
     console.error(error);
  }

}

