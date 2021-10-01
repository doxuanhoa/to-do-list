import React, { useState } from "react";
import { ButtonToolbar, Button, Checkbox, Input } from "rsuite";
import TodoForm from "./TodoForm";

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

  const handleShowDetail = (id) => {
    setExpandId(id);
    setIsShowDetail(!isShowDetail);
  };

  const onRemoveBulk = () => {
    onRemoveMany(checkedKeys);
  };

  const handleCheck = (id, checked) => {
    const tempCheck = checkedKeys.some((element) => element === id)
      ? checkedKeys.filter((item) => item !== id)
      : [...checkedKeys, id];
    setCheckedKeys(tempCheck);
    // setCheckedKeys([...checkedKeys, id]);
  };

  return (
    <>
      <div className="list">
        <div className="col-12 col-lg-8 offset-lg-2 mt-3">
          <h5 className="text-center mb-3">To Do List</h5>
        </div>

        <Input placeholder="Search..." onChange={(e) => onSearch(e)} />

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
            <div class="d-flex bd-highlight to-do-list mt-4">
              <div class="p-2 bd-highlight">
                <Checkbox onChange={() => handleCheck(item.id)} />
              </div>
              <div class="p-2 flex-grow-1 bd-highlight">
                <span className="item-title">{item.task}</span>
              </div>
              <div class="p-2 bd-highlight">
                {" "}
                <Button
                  className="ml-2  action-button"
                  color="cyan"
                  onClick={() => handleShowDetail(item.id)}
                >
                  Detail
                </Button>
              </div>
              <div class="p-2 bd-highlight">
                <Button
                  className="ml-2  action-button"
                  color="red"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>

            {expandId === item.id && isShowDetail && (
              <TodoForm
                taskData={item}
                type="update"
                onSave={(values) => {
                  onUpdateItem(values);
                  setIsShowDetail(!isShowDetail);
                }}
              />
            )}
          </>
        ))}
      </div>
    </>
  );
}
