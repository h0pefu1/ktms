namespace Services;

public class MeetingConsume
{
    static Queue<string> storage = new Queue<string>();
    static int maxCapacity = 5;

    static void MettingConsumeMain()
    {
        Thread producerThread = new Thread(Produce);
        Thread consumerThread = new Thread(Consume);

        producerThread.Start();
        consumerThread.Start();

        producerThread.Join();
        consumerThread.Join();
    }

    static void Produce()
    {
        while (true)
        {
            lock (storage)
            {
                if (storage.Count < maxCapacity)
                {
                    string product = "Product " + Guid.NewGuid();
                    storage.Enqueue(product);
                    Console.WriteLine("Produced: " + product);
                }
                else
                {
                    Monitor.Wait(storage); // Ждем, если склад заполнен
                }
            }

            Thread.Sleep(1000); // Пауза между производством
            lock (storage)
            {
                Monitor.Pulse(storage); // Сигнализируем потребителю
            }
        }
    }

    static void Consume()
    {
        while (true)
        {
            lock (storage)
            {
                if (storage.Count > 0)
                {
                    string product = storage.Dequeue();
                    Console.WriteLine("Consumed: " + product);
                }
                else
                {
                    Monitor.Wait(storage); // Ждем, если склад пуст
                }
            }

            Thread.Sleep(1500); // Пауза между потреблением
            lock (storage)
            {
                Monitor.Pulse(storage); // Сигнализируем производителю
            }
        }
    }
}

