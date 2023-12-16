import { GoArrowUpLeft } from "react-icons/go";


const SuggestionItem=(props)=>{
    const {suggestionDetails,updateSearch}=props;
    const {suggestion}=suggestionDetails;
    const update=()=>{
        updateSearch(suggestion)
    }
    return(
        <li className="flex justify-between p-2 hover:cursor-pointer" onClick={update}>
            <p>{suggestion}</p>
            <GoArrowUpLeft/>
        </li>
    )
 
}

export default SuggestionItem