import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@ObjectType() // Decorador para convertir esta clase en un tipo GraphQL
@Entity()
export class Item {
  @Field() // Exponer este campo en el esquema GraphQL
  @PrimaryGeneratedColumn()
  id: number;

  @Field() // Exponer este campo en el esquema GraphQL
  @Column()
  nombre: string;

  @Field() // Exponer este campo en el esquema GraphQL
  @Column()
  descripcion: string;

  @Field() // Exponer este campo en el esquema GraphQL
  @CreateDateColumn()
  fechaCreacion: Date;
}
