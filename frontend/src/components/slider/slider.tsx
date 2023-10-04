import React, { useState } from "react";

import "./slider.scss";

interface SliderProps {
  imgs: string[];
}

const Slider = ({ imgs }: SliderProps): React.ReactElement => {
  const [index, setIndex] = useState<number>(0);

  // TODO Поправить работу слайдера. Сделать автоматический слайдинг.
  const onSlide = (type: "next" | "previous"): void => {
    if (type === "next") {
      setIndex(index + 1 >= imgs.length ? 0 : index + 1);
    } else {
      setIndex((index - 1 <= 0 ? imgs.length : index) - 1);
    }
  };

  return (
    <div className='slider' style={{ backgroundImage: `url(${imgs[index]})` }}>
      <div className='arrow' style={{ left: 0 }} onClick={(): void => onSlide("previous")}></div>
      <div className='arrow' style={{ right: 0 }} onClick={(): void => onSlide("next")}></div>
    </div>
  );
};

export default Slider;
