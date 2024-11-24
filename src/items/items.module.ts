import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Item } from './item.entity'; // Asegúrate de importar la entidad

@Module({
  imports: [TypeOrmModule.forFeature([Item])], // Registra la entidad Item
  providers: [ItemsService, ItemsResolver],
})
export class ItemsModule {}
