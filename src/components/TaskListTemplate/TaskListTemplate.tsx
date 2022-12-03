import React, { useState } from 'react';
import classes from './TaskListTemplate.module.css';
import { Button } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteFilled,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import Task from 'components/TaskTemplate/Task';
import { showDeleteModal } from 'store/modalsSlice';
import { useAppDispatch } from 'store/hooks';
import { updateColumn } from 'store/columnsSlice';

const TaskListTemplate = (props: { title: string; id: string; token: string; boardId: string }) => {
  const [renameListStatus, setRenameListStatus] = useState(false);
  const [listName, setListName] = useState(props.title);
  const [listNameBeforeChange, setListNameBeforeChange] = useState(listName);
  const dispatch = useAppDispatch();

  return (
    <div className={classes.list}>
      <div className={classes.header}>
        {!renameListStatus ? (
          <>
            <div
              className={classes.list__name}
              onClick={() => {
                setRenameListStatus(true);
              }}
            >
              <span>{listName}</span>
            </div>
            <div className={classes.list__delete}>
              <Button
                icon={<PlusCircleOutlined style={{ color: '#fff' }} />}
                onClick={() => console.log('add task callback')}
                type={'link'}
              />
              <Button
                icon={<DeleteFilled style={{ color: '#fff' }} />}
                type={'link'}
                onClick={() => dispatch(showDeleteModal({ id: props.id, type: 'column' }))}
              />
            </div>
          </>
        ) : (
          <>
            <div className={classes.list__name}>
              <Input
                value={listName}
                maxLength={25}
                onChange={(e) => {
                  setListName(e.target.value);
                }}
              />
            </div>
            <div className={classes.list__delete}>
              <Button
                icon={<CheckCircleOutlined style={{ color: '#fff' }} />}
                type={'link'}
                onClick={() => {
                  setRenameListStatus(false);
                  setListNameBeforeChange(listName);
                  dispatch(
                    updateColumn({
                      id: props.id,
                      token: props.token,
                      boardId: props.boardId,
                      newTitle: listName,
                    })
                  );
                }}
              />
              <Button
                icon={<CloseCircleOutlined style={{ color: '#fff' }} />}
                type={'link'}
                onClick={() => {
                  setListName(listNameBeforeChange);
                  setRenameListStatus(false);
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className={classes.tasks}>
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};

export default TaskListTemplate;
