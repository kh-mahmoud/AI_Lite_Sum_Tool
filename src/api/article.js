import axios from "axios"
import state from "../store";


const RapidAPI_Key = import.meta.env.VITE_RAPID_API_KEY




export const Summurizer= async (url)=>
{

   try {
    const response = await axios.get(`https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(url)}&length=3&lang=${state?.lang}`,
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

