import classes from "./dropdown.module.css";
import downIcon from "@assets/down_icon.svg";
import ListItem from "./listItem";
import { useState, useEffect, useRef, useContext } from "react";
import ItemData from "../interfaces/item.interface";
import CloseIcon from "./closeIcon";
import SpinnerAni from "./spinner";
import {
  PlanetsContextDispatch,
  initialPlanetState,
} from "@src/context/planetContext";
import { ShipsContextDispatch } from "@src/context/shipContext";
import { selectPlanet } from "../planets";

const defaultValue = "None";
const deBounceTime = 1000;

function formatDataList(data: ItemData[] = []) {
  const dataFormatted: ItemData[] = [...data];
  dataFormatted.unshift({ value: defaultValue });
  return dataFormatted;
}

function search(keyword: string, data: ItemData[]) {
  const regex = new RegExp(keyword, "gi");
  return data.filter((value) => regex.test(value.value));
}

export default function DropDown({
  data,
  title = "Destination",
  staticId,
  selectedValue,
}: {
  data: ItemData[];
  title: string;
  staticId: number;
  selectedValue: string | undefined;
}) {
  const [isOpen, setOpenStatus] = useState<boolean>(false);
  const [input, setInput] = useState<string>(defaultValue);
  const [isTyping, setTyping] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | undefined | null>(null);
  const [list, setList] = useState<ItemData[]>([]);

  //context
  const dispatch = useContext(PlanetsContextDispatch);
  const dispatchShipActions = useContext(ShipsContextDispatch);

  const idDiv = `div_${staticId}`;
  const idImg = `img_${staticId}`;
  useEffect(() => {
    document.addEventListener("click", outSideClickHandler);
    return () => {
      document.removeEventListener("click", outSideClickHandler);
    };
  }, []);

  useEffect(() => {
    setList(formatDataList(data));
    if (selectedValue && selectedValue !== "") setInput(selectedValue);
    //check
  }, [data]);

  function dropButtonClickHandler(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    setOpenStatus(!isOpen);
  }
  function outSideClickHandler(e: MouseEvent) {
    if (!e) return;
    e.stopPropagation();
    e.preventDefault();
    //e.stopImmediatePropagation();
    const element = e.target;
    let convertedElement = null;
    if (element instanceof HTMLDivElement) {
      convertedElement = element as HTMLDivElement;
    } else {
      convertedElement = element as HTMLImageElement;
    }

    const condition =
      convertedElement.id === idDiv || convertedElement.id === idImg;
    if (!condition) {
      setOpenStatus(false);
    }
  }
  function selectHandler(value: string) {
    setOpenStatus(false);
    setInput(value);
    if (dispatch)
      dispatch({
        type: "insert",
        value: { name: value, destinationId: staticId - 1 },
      });

    //dispatch
  }
  function postAction(deBounceTime: number, inputValue: string) {
    return setTimeout(() => {
      setTyping(false);
      const results = search(inputValue, data);
      if (results.length > 0) {
        setList(formatDataList(results));
        setOpenStatus(true);
      }
    }, deBounceTime);
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value as string;
    if (!isTyping) {
      setTyping(true);
    }
    if (timerRef.current === null) {
      timerRef.current = postAction(deBounceTime, value);
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = postAction(deBounceTime, value);
    }

    setInput(value);
  }

  function closeHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    setOpenStatus(false);
    setList(formatDataList(data));
    setInput(defaultValue);
    if (dispatch && input !== defaultValue) {
      dispatch({
        type: "remove",
        value: { name: input, destinationId: staticId - 1 },
      });
    }
    if (dispatchShipActions) {
      dispatchShipActions({
        type: "reset_destination",
        value: { destination: staticId - 1 },
      });
    }
  }

  return (
    <div>
      <h4 className={classes.dropHeader}>{title}</h4>
      <div className={classes.wrapper}>
        <input
          type="text"
          className={classes.wrapper__input}
          value={input}
          onChange={inputHandler}
          id="input_field"
        />
        {!isOpen && !isTyping && (
          <div className={classes.wrapper__closeIcon} onClick={closeHandler}>
            <CloseIcon />
          </div>
        )}

        {isTyping && (
          <div className={classes.wrapper__closeIcon}>
            <SpinnerAni />
          </div>
        )}

        <div
          className={classes.wrapper__button}
          onClick={dropButtonClickHandler}
          id={idDiv}
        >
          <img
            src={downIcon}
            alt="arrow_down_icon"
            className={classes.wrapper__buttonIcon}
            id={idImg}
          />
        </div>
        {isOpen && (
          <div className={classes.wrapper__drawer}>
            {list.map((item, index) => (
              <ListItem
                key={`${index}-${item.value}`}
                value={item.value}
                info={item.info}
                clickHandler={selectHandler}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
