import { useRef, useState } from "react";
import "./style.css";

interface AccordionProps {
    title: string | undefined;
    numberMain: string | undefined;
    numberCel: string | undefined;
    numberJob: string | undefined;
    deleteButton: () => void;
    edit: () => void;
}

export const Accordion = ({ title, numberMain, numberCel, numberJob, edit, deleteButton}: AccordionProps) => {
  const [active, setActive] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content?.current?.scrollHeight}px`);
  }

  return (
    <div className="accordion__section">
      <div
        className={`accordion ${active ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <p className="accordion__title">Nome: {title}</p>
        <span style={{ marginLeft: "20px" }}>{active ? "-" : "+"}</span>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        <p>Principal: {numberMain}</p>
        <p>Celular: {numberCel}</p>
        <p>Trabalho: {numberJob}</p>

        <button onClick={edit}>editar</button>

        <button onClick={deleteButton}>Deletar</button>
      </div>
    </div>
  );
}