import React, {useEffect, useState} from "react";
import './styles/App.css'
import ItemList from "./component/ItemList";
import Pagination from "./component/Pagination";
import ItemService from "./API/ItemService";
import {useFetching} from "./hooks/useFetching";
import {getPageCount} from "./utils/pages";
import Select from "./UI/Select";
function App() {
    const [items, setItems] = useState([])
    const [totalCount, setTotalCount] = useState(100)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(50)
    const [page, setPage] = useState(1)
    const [offset, setOffset] = useState(0)
    const [brands, setBrands] = useState([])
    const [selectBrand, setSelectBrand] = useState('')
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')

    const [fetchItems, isItemsLoading, itemError] = useFetching(async () => {
        const items = await ItemService.getItems(limit, page, offset);
        setItems(items)
        setTotalPages(getPageCount(totalCount, limit))
    })
    const [fetchBrandsName] = useFetching(async () => {
        const brands = await ItemService.getBrandsName();
        setBrands(brands)
    })
    const [fetchBrandItems, isBrandsLoading] = useFetching(async (selectBrand) => {
        const brands1 = await ItemService.getBrandItems(selectBrand);
        setSelectBrand('')
        setPage(1)
        setItems(brands1)
        setTotalCount(50)
        setTotalPages(getPageCount(totalCount, limit))
    })
    const [fetchPriceItems, isPriceLoading] = useFetching(async (price) => {
        const prices = await ItemService.getPriceItems(price);
        setPrice(0)
        setPage(1)
        setItems(prices)
    })
    const [fetchNameItems, isNameLoading] = useFetching(async (name) => {
        const names = await ItemService.getNameItems(name);
        setTotalCount(names.length)
        setTotalPages(getPageCount(totalCount, limit))
        setItems(names)
    })
    useEffect( () => {
        fetchBrandsName()
    }, [])
    useEffect( () => {
        fetchItems()
    }, [offset])

    const changePageArrow = (e) => {
        e.target.textContent === "⋘" ? changePage(page -1) : changePage(page +1)
    }
    const changePage = (page) => {
        setPage(page)
        setOffset((page - 1)*50)
    }
    const changePrice = () => {
        fetchPriceItems(Number(price.toFixed(2)))
    }
    const changeName = () => {
        fetchNameItems(name)
    }

    const changeBrands = (brand) => {
        setSelectBrand(brand)
        setTotalCount(50)
        fetchBrandItems(brand)

    }
  return (
      <div className="app">
          <h1>Список товаров</h1>
          <h2>Фильтры</h2>
          <div className={'filters'}>

              <Select
                  value={selectBrand}
                  onChange={changeBrands}
                  defaultValue="Выберите бренд"
                  options={brands}
              />
              <label htmlFor="price">Введите цену</label>
              <input id="price" type="text" placeholder="Введите цену" onChange={(e) => setPrice(Number(e.target.value))}/>
              <button onClick={changePrice}>Фильтрация по цене</button>
              <label htmlFor="name">Введите название</label>
              <input id="name" type="text" placeholder="Название" onChange={(e) => setName(e.target.value)}/>
              <button onClick={changeName}>Фильтрация по названию</button>
          </div>

          {isItemsLoading || isBrandsLoading || isPriceLoading || isNameLoading
              ? <h1>Идёт загрузка данных</h1>
              : <ItemList items={items}/>

          }
          <Pagination page={page} changePage={changePage} totalPages={totalPages} changePageArrow={changePageArrow}/>



      </div>
  );
}

export default App;
