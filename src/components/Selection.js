import './Selection.css'
import { useState, useCallback } from "react";

const Selection = ({getCurrentFormat, handleOutput}) => {
  const [active, setActive] = useState('jsonld');

  const [dataTabs, setDataTabs] = useState([
    {
      id: 'jsonld',
      tabTitle: "Jsonld",
      tabClass: "myCustomClass",
      tabClicked: false
    },
    {
      id: 'html',
      tabTitle: "Html",
      tabClass: "myCustomClass",
      tabClicked: false
    }
  ]);

  const NavLink = ({ id, tabTitle, isActive, onClick }) => {
    return (
      <a
        href="#json-ld-faq-schema"
        onClick={() => navigate(id)}
        className={isActive ? "selected" : ""}
      >
        {tabTitle}
      </a>
    );
  };

  const navigate = (id) => {
    setActive(id);
    getCurrentFormat(id);

    handleOutput(id);

  };

  return (
    <ul className="variations-checkbox">
      {dataTabs.map((item) => (
        <li key={item.id}>
          <NavLink {...item} isActive={active === item.id} onClick={navigate} />
        </li>
      ))}
    </ul>
  );
};
export default Selection;