import React, { useCallback, useEffect, useState } from "react";
import BasketService from "../../services/basket/basket.service";
import { IBasket } from "../../models/basket/basket";
import * as _ from "lodash";

import "./basket.scss";

const Basket = (): React.ReactElement => {
  const [basketList, setBasketList] = useState<IBasket[]>([]);

  useEffect(() => {
    BasketService.getUserBasket().then(res => {
      setBasketList(res);
    });
  }, []);

  /**
   * Сохраняет изменения коризины на сервере
   */
  const handleDebounceFn = (basket: IBasket) => {
    BasketService.basketUpdate(basket);
  };

  const debounceFn = useCallback(_.debounce(handleDebounceFn, 1000), []);

  const productBlock = (basket: IBasket): React.ReactElement => {
    return (
      <div className='product' key={basket.id}>
        <div className='block'>
          <h5>{basket.product.name}</h5>
          <p>{basket.product.short_description}</p>
        </div>
        <div className='controler'>
          <input
            type='number'
            value={basket.quantity}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = +event.target.value;
              const list: IBasket[] = _.cloneDeep(basketList);
              const elem = list.find(product => product.id === basket.id);
              if (elem && value > 0) {
                elem.quantity = value;
                debounceFn(elem);
              };
              setBasketList(list);
            }}
            />
          <p className='price'>{+basket.product.price * basket.quantity} руб.</p>
          <i
            className='fa fa-trash-o'
            aria-hidden='true'
            onClick={(): void => {
              BasketService.delete(basket.id).then((): void => {
                setBasketList(basketList.filter(el => el.id !== basket.id));
              });
            }}
          ></i>
        </div>
      </div>
    );
  };

  const totalCount = basketList.reduce((acc, dec) => (acc + dec.quantity), 0);
  const totalPrice = basketList.reduce((acc, dec) => (acc + (+dec.product.price * dec.quantity)), 0)

  return (
    <div className='basket'>
      <div className='basket-header'>
        <h4>Корзина {!basketList.length ? "пуста" : ""}</h4>
        {!!totalCount && <div className='products-count'>{totalCount}</div>}
      </div>
      {!!basketList.length && (
        <>
          <div className='basket-content'>
            {basketList?.map(product => productBlock(product))}
          </div>
          <div className='basket-footer'>
            <p>Итого:</p>
            <h4>{totalPrice} руб.</h4>
          </div>
          <button>Оформить заказ</button>
        </>
        )
      }
    </div>
  );  
};

export default Basket;
