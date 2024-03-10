import React from 'react';
import Item from "./Item";

const ItemList = ({items}) => {
    return (
        <div>

            <div className="items">
                {items.map(item =>
                    <Item item={item} key={item.id}/>
                )}

            </div>
        </div>
    );
};

export default ItemList;