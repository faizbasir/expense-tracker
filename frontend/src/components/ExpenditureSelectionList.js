import React, { useState } from "react";
import DropDownItem from "./DropDownItem";

const OverviewSelectionList = (props) => {
    const [openDropdown, setOpenDropdown] = useState(false)
    
    const clickHandler = () => {
        setOpenDropdown(!openDropdown)
    }

    return (
        <>
            <div className={`cursor-default w-fit text-[#ccc] px-4 py-1 mt-2 bg-secondary border-solid border-2 ${openDropdown ? "rounded-t-2xl" : "rounded-2xl"}`} onClick={clickHandler}>
                {props.type}
            </div>
            {openDropdown &&
                <ul className="absolute z-50 cursor-default rounded-b-lg bg-white transition-all duration-500 ease-in border-2 border-solid">
                    <DropDownItem text={"Income"} onClick={clickHandler} />
                    <DropDownItem text={"Expense"} onClick={clickHandler} />
                </ul>
            }
        </>
    )
}

export default OverviewSelectionList