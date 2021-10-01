import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Alert } from "rsuite";

export default function Home() {
  const [data, setData] = useState([]);
  const [loadList, setLoadList] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState(null);

  useEffect(() => {
    getData();
  }, [loadList]);

  const getData = () => {
    let list = valueSearch
      ? dataSearch
      : JSON.parse(localStorage.getItem("list")) || [];
    setData(list);
  };

  const reloadData = () => {
    setLoadList(!loadList);
  };

  const onSaveItem = (values) => {
    let list = JSON.parse(localStorage.getItem("list")) || [];
    console.log(`object`, values);
    localStorage.setItem(
      "list",
      JSON.stringify([...list, { ...values, id: new Date().getTime() }])
    );
    reloadData();
    Alert.success("Successful!", 2000);
    console.log(`list`, list);
  };

  const onUpdateItem = (id) => {
    console.log(`id update`, id);
  };

  const onRemoveBulk = (arr) => {
    let newData = data.filter((value, index) => {
      return arr.indexOf(index) == -1;
    });
    localStorage.setItem("list", JSON.stringify(newData));
    reloadData();
  };

  const onRemoveItem = (id) => {
    let index = data.findIndex((s) => s.id === id);
    console.log(`index: `, index);
    data.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(data));
    reloadData();
    Alert.success("Successful!", 2000);
  };

  const onSearchData = (value) => {
    setValueSearch(value);
    console.log(`value`, value);
    let search = data.filter((newData) => {
      return newData.task.toUpperCase().includes(value.toUpperCase());
    });
    setDataSearch(search);
    console.log(`dataSearch`, dataSearch);
    reloadData();
  };

  return (
    <div>
      <TodoForm onSave={onSaveItem} onRemoveMany={onRemoveBulk} />
      <TodoList
        data={data}
        onRemove={onRemoveItem}
        onUpdateItem={onUpdateItem}
        onSearch={onSearchData}
      />
    </div>
  );
}
