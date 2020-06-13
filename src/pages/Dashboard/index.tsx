import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer, Content } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get<IFoodPlate[]>('/foods');

      setFoods(response.data);
    }

    loadFoods();
  }, []);

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const { data } = await api.post<IFoodPlate>('/foods', {
        ...food,
        available: true,
      });

      setFoods(oldState => [...oldState, data]);
    } catch (err) {
      alert('Falha ao adicionar novo prato.');
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    let foodUpdated = { ...editingFood, ...food };
    try {
      const response = await api.put(`/foods/${editingFood.id}`, foodUpdated);

      foodUpdated = response.data;

      setFoods(state =>
        state.map(foodItem =>
          foodItem.id === foodUpdated.id ? foodUpdated : foodItem,
        ),
      );
    } catch (error) {
      alert(`Falha ao atulizar o prato: ${editingFood.name}`);
    }
  }

  async function handleDeleteFood(id: number): Promise<void> {
    try {
      await api.delete(`/foods/${id}`);

      setFoods(oldState => oldState.filter(food => food.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <Content>
        <FoodsContainer data-testid="foods-list">
          {foods?.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
        </FoodsContainer>
      </Content>
    </>
  );
};

export default Dashboard;
