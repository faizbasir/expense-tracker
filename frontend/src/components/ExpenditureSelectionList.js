import React, { useState } from "react";
import DropDownItem from "./DropDownItem";

const OverviewSelectionList = (props) => {
    const [openDropdown, setOpenDropdown] = useState(false)
    
    const clickHandler = (e) => {
        setOpenDropdown(!openDropdown)
        props.selectType(e.target.outerText)
    }

    return (
        <>
            <div className={`cursor-default w-[30%] text-white px-4 py-1 mt-2 bg-secondary border-solid border-2 ${openDropdown ? "rounded-t-2xl" : "rounded-2xl"}`} onClick={clickHandler}>
                {props.type}
            </div>
            
            {openDropdown &&
                <ul className="absolute z-50 w-[12%] cursor-default rounded-b-lg bg-white transition-all duration-500 ease-in border-2 border-solid rounded-b-2xl">
                    <DropDownItem text={"Income"} onClick={clickHandler} />
                    <DropDownItem text={"Expense"} onClick={clickHandler} />
                </ul>
                }
            
        </>
    )
}

export default OverviewSelectionList