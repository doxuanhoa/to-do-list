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
    Alert.success("Successful!", 2000);
  };

  const onSaveItem = (values) => {
    let list = JSON.parse(localStorage.getItem("list")) || [];
    localStorage.setItem(
      "list",
      JSON.stringify([...list, { ...values, id: new Date().getTime() }])
    );
    reloadData();
  };

  const onUpdateItem = (item) => {
    let index = data.findIndex((s) => s.id === item.id);
    data[index] = item;
    localStorage.setItem("list", JSON.stringify(data));
    reloadData();
  };

  const onRemoveBulk = (arr) => {
    let arrIndex = arr.map(function (word) {
      return data.findIndex((s) => s.id === word);
    });
    let newData = data.filter((value, index) => {
      return arrIndex.indexOf(index) == -1;
    });
    localStorage.setItem("list", JSON.stringify(newData));
    reloadData();
  };

  const onRemoveItem = (id) => {
    let index = data.findIndex((s) => s.id === id);
    data.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(data));
    reloadData();
  };

  const onSearchData = (value) => {
    setValueSearch(value);
    let search = data.filter((newData) => {
      return newData.task.toUpperCase().includes(value.toUpperCase());
    });
    setDataSearch(search);
    setLoadList(!loadList);
  };

  return (
    <div>
      <TodoForm onSave={onSaveItem} />
      <TodoList
        data={data}
        onRemove={onRemoveItem}
        onUpdateItem={onUpdateItem}
        onSearch={onSearchData}
        onRemoveMany={onRemoveBulk}
      />
    </div>
  );
}
