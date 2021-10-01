import React, { useState, useEffect } from "react";
import { ButtonToolbar, Button, Checkbox, Input } from "rsuite";
import TodoForm from "./TodoForm";

// const data = [
//   {
//     task: "Task 1",
//     description: "abc",
//     piority: 1,
//     dueDate: "2021-10-05T14:48:00.000Z",
//     id: 1,
//   },
//   {
//     task: "Task 2",
//     description: "bcd",
//     piority: 2,
//     dueDate: "2021-10-05T14:48:00.000Z",
//     id: 2,
//   },
//   {
//     task: "Task 3",
//     description: "cde",
//     piority: 3,
//     dueDate: "2021-10-05T14:48:00.000Z",
//     id: 3,
//   },
//   {
//     task: "Task 4",
//     description: "cde",
//     piority: 3,
//     dueDate: "2021-10-05T14:48:00.000Z",
//     id: 5,
//   },
// ];

export default function TodoList({
  data,
  onRemove,
  onRemoveMany,
  onUpdateItem,
  onSearch,
  ...props
}) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [expandId, setExpandId] = useState(null);
  const [checkedKeys, setCheckedKeys] = useState([]);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = () => {
  //   let list = JSON.parse(localStorage.getItem("list")) || [];
  //   setData(list);
  // };

  const handleShowDetail = (id) => {
    setExpandId(id);
    setIsShowDetail(!isShowDetail);
    // onUpdateData(id);
  };

  const handleUpdate = (id) => {
    onUpdateItem(id);
  };

  const onRemoveItem = (id) => {
    onRemove(id);
  };

  const onRemoveBulk = () => {
    console.log(`bulk`, checkedKeys);
    onRemoveMany(checkedKeys);
  };

  const handleCheck = (id, checked) => {
    // const nextCheckedKeys =
    //   checked && checkedKeys.indexOf(id) === -1
    //     ? [...checkedKeys, id  ]
    //     : checkedKeys.filter((item) => item !== id);
    // setCheckedKeys(nextCheckedKeys);

    const tempCheck = checkedKeys.some((element) => element === id)
      ? checkedKeys.filter((item) => item !== id)
      : [...checkedKeys, id];
    setCheckedKeys(tempCheck);
    // setCheckedKeys([...checkedKeys, id]);
    console.log(`checkedKeys`, checkedKeys);
  };

  const onChangeSearchField = (e) => {
    // console.log(`e.target.value`, e);
    onSearch(e);
    // let search = arrayProduct.filter((newArray) => {
    //   return (
    //     data.name.toUpperCase().includes(e.target.value.toUpperCase()) |
    //   );
    // });
    // setKeyWord(e.target.value.toUpperCase());
  };

  return (
    <>
      <div className="list">
        <div className="col-12 col-lg-8 offset-lg-2 mt-3">
          <h5 className="text-center mb-3">To Do List</h5>
        </div>

        <Input
          placeholder="Search..."
          onChange={(e) => onChangeSearchField(e)}
        />

        {checkedKeys.length > 0 && (
          <div className="to-do-list bulk-action mt-4">
            <div className="d-flex justify-content-between align-middle">
              <div className=" mt-2 ">
                <span className="todo-title ml-3 ">Bulk Action</span>
              </div>
              <div className="d-flex justify-content-between align-items-end mt-2 mr-2">
                <ButtonToolbar className="d-flex ">
                  <Button className="ml-2  action-button" color="blue">
                    Done
                  </Button>
                  <Button
                    className="ml-2  action-button"
                    color="red"
                    onClick={onRemoveBulk}
                  >
                    Remove
                  </Button>
                </ButtonToolbar>
              </div>
            </div>
          </div>
        )}

        {data.map((item, key) => (
          <>
            <div className="to-do-list todo-item mt-4">
              <div className="d-flex justify-content-between align-middle">
                <Checkbox onChange={() => handleCheck(item.id)} />
                <div className=" mt-2 ">
                  <span className="item-title">{item.task}</span>
                </div>
                <div className="d-flex justify-content-between align-items-end mt-2 mr-2">
                  <ButtonToolbar className="d-flex ">
                    <Button
                      className="ml-2  action-button"
                      color="cyan"
                      onClick={() => handleShowDetail(item.id)}
                    >
                      Detail
                    </Button>
                    <Button
                      className="ml-2  action-button"
                      color="red"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </ButtonToolbar>
                </div>
              </div>
            </div>

            {expandId === item.id && isShowDetail && (
              <TodoForm
                taskData={item}
                type="update"
                onSave={handleUpdate(item.id)}
              />
            )}
          </>
        ))}
      </div>
    </>
  );
}
