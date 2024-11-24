import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, MessagePattern, EventPattern } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'items_queue',
        queueOptions: { durable: true },
      },
    });

    console.log('Conexión a RabbitMQ inicializada');
  }

  // Enviar un mensaje a RabbitMQ
  sendMessage(event: string, payload: any) {
    this.client.emit(event, payload);
    console.log(`Mensaje enviado a RabbitMQ: Evento: ${event}, Payload:`, payload);
  }

  // Handler para eventos 'item_created'
  @EventPattern('item_created') // Escucha mensajes con el evento 'item_created'
  handleItemCreated(data: any) {
    console.log('Mensaje recibido en "item_created":', data);
  }

  // Handler para eventos 'item_updated'
  @EventPattern('item_updated') // Escucha mensajes con el evento 'item_updated'
  handleItemUpdated(data: any) {
    console.log('Mensaje recibido en "item_updated":', data);
  }
}
