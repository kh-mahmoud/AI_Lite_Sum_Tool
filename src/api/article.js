import axios from "axios";
import state from "../store";

const RapidAPI_Key = import.meta.env.VITE_RAPID_API_KEY;

export const Summarizer = async (url) => {
  try {
    const response = await axios.get(`https://article-extractor-and-summarizer.p.rapidapi.com/summarize`, {
      params: {
        url: url,
        lang: state.lang || 'en',
        engine: '2',
        length: 16,
      },
      headers: {
        'X-RapidAPI-Key': RapidAPI_Key,
        'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com',
      },
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error(error.config);
  }
};
