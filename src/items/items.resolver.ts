import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  // Obtener todos los Items
  @Query(() => [Item], { name: 'getAllItems' })
  findAll() {
    console.log('Consultando todos los items...');
    return this.itemsService.findAll();
  }

  // Obtener un Item por ID
  @Query(() => Item, { name: 'getItemById' })
  findOne(@Args('id') id: number) {
    console.log(`Consultando el item con ID: ${id}`);
    return this.itemsService.findOne(id);
  }

  // Crear un nuevo Item
  @Mutation(() => Item)
  createItem(
    @Args('nombre') nombre: string,
    @Args('descripcion') descripcion: string,
  ) {
    console.log('Creando un nuevo item:', { nombre, descripcion });
    return this.itemsService.create({ nombre, descripcion });
  }

  // Actualizar un Item
  @Mutation(() => Item)
  updateItem(
    @Args('id') id: number,
    @Args('nombre') nombre: string,
    @Args('descripcion') descripcion: string,
  ) {
    console.log(`Actualizando el item con ID: ${id}`, { nombre, descripcion });
    return this.itemsService.update(id, { nombre, descripcion });
  }

  // Eliminar un Item
  @Mutation(() => Boolean)
  async removeItem(@Args('id') id: number): Promise<boolean> {
    console.log(`Eliminando el item con ID: ${id}`);
    await this.itemsService.remove(id);
    console.log(`Item con ID: ${id} eliminado correctamente.`);
    return true;
  }
}
