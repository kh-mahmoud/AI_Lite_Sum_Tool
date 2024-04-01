import { proxy } from "valtio";




const state = proxy({
  lang:JSON.parse(localStorage.getItem("lang"))
});



export default state;