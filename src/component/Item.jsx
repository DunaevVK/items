import React from 'react';

const Item = ({item}) => {
    return (
        <div className={'item'}>
            <div className={'item__content'}>
                <div className={'item__id'}>id: {item.id}</div>
                <div className={'item__title'}>Название товара: {item.product}</div>
                <div className={'item__brand'}>Бренд: {item.brand}</div>
                <div className={'item__price'}>Цена: {item.price}</div>
            </div>
        </div>
    );
};

export default Item;