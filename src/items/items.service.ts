import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { EventEmitter2 } from '@nestjs/event-emitter'; // Importamos EventEmitter2

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
    private readonly eventEmitter: EventEmitter2, // Inyectamos el EventEmitter
  ) {}

  // Obtener todos los Items
  findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  // Obtener un Item por su ID
  async findOne(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item con ID ${id} no encontrado`);
    }
    return item;
  }

  // Crear un nuevo Item
  async create(data: Partial<Item>): Promise<Item> {
    const item = this.itemsRepository.create(data);
    const newItem = await this.itemsRepository.save(item);

    // Emitimos el evento de creación
    console.log('Emitimos el evento: item_created');
    this.eventEmitter.emit('item_created', newItem);

    return newItem;
  }

  // Actualizar un Item existente
  async update(id: number, data: Partial<Item>): Promise<Item> {
    await this.itemsRepository.update(id, data);
    const updatedItem = await this.itemsRepository.findOne({ where: { id } });
    if (!updatedItem) {
      throw new NotFoundException(`Item con ID ${id} no encontrado`);
    }

    // Emitimos el evento de actualización
    console.log('Emitimos el evento: item_updated');
    this.eventEmitter.emit('item_updated', updatedItem);

    return updatedItem;
  }

  // Eliminar un Item
  async remove(id: number): Promise<void> {
    const result = await this.itemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item con ID ${id} no encontrado`);
    }

    // Emitimos el evento de eliminación
    console.log('Emitimos el evento: item_deleted');
    this.eventEmitter.emit('item_deleted', { id });
  }
}
