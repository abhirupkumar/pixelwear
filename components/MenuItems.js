import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import Link from "next/link";
import { useRouter } from "next/router";

const MenuItems = ({ items, depthLevel, mobile }) => {

    const router = useRouter()

    let ref = useRef();
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    const dropdownClass = depthLevel > 0 ? "" : "py-6";

    return (
        <li className={`menu-items lg:relative flex sm:flex-col px-2 rounded-lg`} ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
            {items.submenu ? (
                <>
                    <button type="button" aria-haspopup="menu" className={`w-full flex flex-row mx-auto text-center items-center hover:text-indigo-700 ${dropdownClass} rounded-lg`} aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => {
                            setDropdown((prev) => !prev)
                            router.push(items.link)
                        }} >
                        {items.title}
                        {depthLevel > 0 ? <span className="text-xs font-semibold"><IoIosArrowForward /></span> : <span className="text-xs font-thin"><IoIosArrowDown /></span>}
                    </button>
                    <div className={`flex flex-col mx-auto w-24 items-center fixed z-30 bg-white shadow-2xl cursor-pointer`}>
                        <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
                    </div>
                </>
            ) : (
                <Link href={`${items.link}`}><a className={`hover:text-indigo-700 py-0 rounded-lg`}>{items.title}</a></Link>
            )}
        </li>
    );
};

export default MenuItems;