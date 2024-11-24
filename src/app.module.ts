import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter'; // Importamos EventEmitterModule
import { ItemsModule } from './items/items.module';
import { MessageModule } from './message/message.module'; // Asegúrate de tener el MessageModule

@Module({
  imports: [
    // Configuración de GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Especifica el driver de Apollo
      autoSchemaFile: true, // Generar automáticamente el esquema GraphQL
      playground: true, // Habilitar GraphQL Playground
    }),

    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia según tu configuración
      port: 5432, // Puerto de PostgreSQL
      username: 'postgres', // Usuario de PostgreSQL
      password: '1234', // Contraseña de tu base de datos
      database: 'graphql_db', // Nombre de tu base de datos
      entities: [__dirname + '/**/*.entity.{ts,js}'], // Escanear todas las entidades
      synchronize: true, // Sincronizar automáticamente las entidades
    }),

    // Configuración de EventEmitter
    EventEmitterModule.forRoot(), // Inicializar EventEmitter

    // Módulos del proyecto
    ItemsModule,
    MessageModule, // Registrar el módulo de mensajes
  ],
})
export class AppModule {}
