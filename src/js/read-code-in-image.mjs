
import OpenAI from 'openai'
import dotenv from 'dotenv'
import path, { resolve } from 'path'
import { get_image_base64 } from "./utils.mjs"

dotenv.config({ path: path.resolve('./.env') });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an smart vision AI assistant with eagle eyes." +
          "You are very good at reading images. You can read text from the image and complete the task given."
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "Read the text from the image. If it's a programming code, please execute it and print the output.",
          },
          {
            type: "image_url",
            image_url: {
              "url": get_image_base64(resolve("./images/code-the-image.PNG")),
              // "url": get_image_base64(resolve("./images/reverse_hello_world.PNG")),
            },
          }
        ],
      },
      {
        "role": "assistant",
        "content": "The image appears to be a diagram illustrating the workflow of a chat application. It shows two users, \"John\" and \"Mary,\" within a chat room labeled \"Room 101.\" \n\nHere is a breakdown of the text in the image:\n\n- Chat App - Room 101\n  - John says: \"Hey Mary!\"\n  \nConnections and interactions:\n- John establishes a connection to the server.\n- John sends a message to the server.\n- The server receives the message and forwards it to the database.\n- Mary receives the message from the server.\n- Mary establishes a connection to the server.\n\nAdditionally, there is an IP address at the bottom of the image: `34.231.165.30`.\n\nThis image is a conceptual diagram and does not contain any programming code that can be executed."
      },
      {
        "role": "user",
        "content": "You identified it correctly. But, you should generate a java code. For example, if it is a commmuncation between 2 user. You should write a server code implementing the same."
      }
    ],
  });

  // console.log(JSON.stringify(response, null, 2));
  console.log(response.choices[0].message.content);
}

main().then().catch(error => console.error(error));

/*
Certainly! Below is an example of a simple chat application in Java that implements a basic client-server communication system. A server can handle multiple clients using threads. Given the context you provided, this example will involve:

1. A `Server` program that listens for connections and forwards messages between clients.
2. A `Client` program that connects to the `Server` and sends/receives messages.

### ChatServer.java
```java
import java.io.*;
import java.net.*;
import java.util.*;

public class ChatServer {
    private static Set<ClientHandler> clientHandlers = new HashSet<>();

    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(12345);
        System.out.println("Server started on port 12345.");

        while (true) {
            Socket socket = serverSocket.accept();
            ClientHandler clientHandler = new ClientHandler(socket);
            clientHandlers.add(clientHandler);
            new Thread(clientHandler).start();
        }
    }

    static class ClientHandler implements Runnable {
        private Socket socket;
        private PrintWriter out;
        private BufferedReader in;

        public ClientHandler(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            try {
                in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                out = new PrintWriter(socket.getOutputStream(), true);

                String message;
                while ((message = in.readLine()) != null) {
                    System.out.println("Received: " + message);
                    forwardMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                clientHandlers.remove(this);
            }
        }

        private void forwardMessage(String message) {
            for (ClientHandler clientHandler : clientHandlers) {
                if (clientHandler != this) {
                    clientHandler.out.println(message);
                }
            }
        }
    }
}
```

### ChatClient.java
```java
import java.io.*;
import java.net.*;

public class ChatClient {
    private Socket socket;
    private BufferedReader consoleReader;
    private PrintWriter socketWriter;
    private BufferedReader socketReader;

    public ChatClient(String serverAddress, int serverPort) throws IOException {
        socket = new Socket(serverAddress, serverPort);
        consoleReader = new BufferedReader(new InputStreamReader(System.in));
        socketWriter = new PrintWriter(socket.getOutputStream(), true);
        socketReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    }

    public void start() {
        new Thread(new SocketReader()).start();
        try {
            String message;
            while ((message = consoleReader.readLine()) != null) {
                socketWriter.println(message);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private class SocketReader implements Runnable {
        @Override
        public void run() {
            try {
                String message;
                while ((message = socketReader.readLine()) != null) {
                    System.out.println("Received: " + message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        try {
            ChatClient client = new ChatClient("127.0.0.1", 12345);
            client.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Explanation
1. **ChatServer.java:** 
   - The server starts on port 12345.
   - It listens for incoming client connections.
   - Each new client connection is handled by `ClientHandler` in a new thread.
   - `ClientHandler` reads messages from the client and forwards them to all other connected clients.

2. **ChatClient.java:**
   - The client connects to the server at `127.0.0.1` on port 12345.
   - It reads user input from the console and sends it to the server.
   - It also listens for incoming messages from the server in a separate thread and prints them to the console.

Compile and run `ChatServer.java` first. Then, run multiple instances of `ChatClient.java` to simulate multiple users chatting with each other.

**Note:** This is a basic implementation. In a real-world application, consider adding error handling, security, and more sophisticated management of clients and messages.

*/

