import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar RabbitMQ como microservicio
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'], // URL de RabbitMQ
      queue: 'items_queue', // Cola para los mensajes
      queueOptions: {
        durable: true, // Asegura que la cola persiste entre reinicios
      },
    },
  });

  await app.startAllMicroservices(); // Iniciar microservicios
  await app.listen(3000);
}
bootstrap();
