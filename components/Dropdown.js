import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    return (
        <ul className={`dropdown top-[62px] min-w-max ${dropdownClass} ${dropdown ? "fixed" : "hidden"} fixed bg-white shadow-lg`}>
            {submenus.map((submenu, index) => (
                <div className="menu-items relative flex flex-col px-3 py-1 my-2 text-sm hover:bg-purple-100 font-semibold">
                    <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
                </div>
            ))}
        </ul>
    );
};

export default Dropdown;