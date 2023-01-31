import React, { useState, useEffect } from 'react';
import { Button, HStack, Input, StackDivider, Spacer, Heading, Text, VStack, IconButton, Checkbox } from '@chakra-ui/react';
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask
} from '../services/todoServices'
import { FaTrash } from 'react-icons/fa';
import './todoApp.css'

interface Todo {
  id: number;
  text: string;
  done: boolean;
  createAt: Date;
}

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
        getTasks()
        .then(res => {
        setTodos(res.data);
      });
  }, []);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = async () => {
    const response = await addTask(newTodo);
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const handleUpdate = async (id: number, done: boolean) => {
    const response = await updateTask(id, done);
    const newResponse = await getTasks();
    setTodos([...newResponse.data]);
    setNewTodo('');
  };

  const handleDelete = async (id: number) => {
    const response = await deleteTask(id);
    const newResponse = await getTasks();
    setTodos([...newResponse.data]);
    setNewTodo('');
  };

  const vStackProps = {
    p: '4',
    w: '100%',
    maxW: { base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' },
    borderColor: 'gray.100',
    borderWidth: '2px',
    borderRadius: 'lg',
    alignItems: 'stretch',
    divider: <StackDivider />
  }

  const buttonProps = {
    icon: <FaTrash />,
    isRound: true,
    'aria-label': 'delete',
  }
  
  return (
    <>
      <VStack p={4}>
        <Heading size='2xl'>Chakra UI Todo App</Heading>
        <form onSubmit={handleSubmit}>
          <HStack m='8'>
            <Input variant='filled' placeholder='learning Chakra UI' onChange={handleTodoChange}/>
            <Button type='submit' colorScheme='green' px='8'>Add Todo</Button>
          </HStack>
        </form>
        <VStack {...vStackProps}>
          {todos.map(todo => (
            <HStack key={todo.id}>
              <Checkbox
                isChecked={todo.done}
                onChange={() => handleUpdate(todo.id, !todo.done)}
              />
              <Text className={todo.done ? 'line_through' : 'no-line'}>{todo.text}</Text>
              <Spacer />
              <IconButton onClick={() => handleDelete(todo.id)} {...buttonProps} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </>
  );
};