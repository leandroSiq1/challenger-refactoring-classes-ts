import { useState, ChangeEvent } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void; 
  editingFood: FoodInput;
  handleUpdateFood: (food: FoodInput) => void;
}

interface FoodInput {
  id: number;
  available: boolean;
  name: string;
  image: string;
  price: string;
  description: string;
}

export default function ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalEditFoodProps) {
  const [foodEdit, setFoodEdit] = useState({} as FoodInput);

  async function handleSubmit() {
    handleUpdateFood(foodEdit);
    setIsOpen();
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fieldName = event.target.getAttribute('name');

    if (fieldName) {
      setFoodEdit({
        ...foodEdit,
        [fieldName]: event.target.value,
      });
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input 
          name="image" 
          placeholder="Cole o link aqui"
          value={foodEdit.image}
          onChange={(event) => handleChange(event)}
        />

        <Input 
          name="name" 
          placeholder="Ex: Moda Italiana"
          value={foodEdit.name}
          onChange={(event) => handleChange(event)}
        />
        <Input 
          name="price" 
          placeholder="Ex: 19.90"
          value={foodEdit.price}
          onChange={(event) => handleChange(event)}
        />

        <Input 
          name="description" 
          placeholder="Descrição"
          value={foodEdit.description}
          onChange={(event) => handleChange(event)}
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};