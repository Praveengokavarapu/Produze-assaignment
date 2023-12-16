import Home from "./components/Home";
//static list of 10 cities
const suggestionsList=[
  {id:1,suggestion:"Hyderabad"},
  {id:2,suggestion:"Mumbai"},
  {id:3,suggestion:"Pune"},
  {id:4,suggestion:"Kolkata"},
  {id:5,suggestion:"Chennai"},
  {id:6,suggestion:"Bengaluru"},
  {id:7,suggestion:"Jaipur"},
  {id:8,suggestion:"Bhopal"},
  {id:9,suggestion:"Nagpur"},
  {id:10,suggestion:"Jaipur"},
  
]
const App=()=>{
  return <Home suggestionsList={suggestionsList}/>
}

export default App