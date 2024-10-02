# Django For EveryBody

## Creating a Server with Python

```python

from socket import *

def create_server():
    #making a phone
    #AF_INET: specifies the address family or protocol to be used by the socket. AF_INET refers to IPv4.
    #SOCK_STREAM: this sets the socket type to be a TCP socket. it specifies that the socket is connection oriented meaning it will use TCP, which ensures reliable delivery of data between two networked services.
    server_socket = socket(AF_INET, SOCK_STREAM)

    try:
        #binds the socket to the 9000 port
        server_socket.bind(('localhost', 9000))
        #start listening for incomming connections
        #this socket can queue upto 5 clients
        server_socket.listen(5)

        #This loop runs indefinitely to keep accepting client connections.
        while(1):
            #when a client connects, the server accepts the connection. clientsocket is a new socket used to communicate with the connected client and address contains the clinets address info
            (clientsocket, address) = server_socket.accept()

            #This line receives up to 5000 bytes of data from the client and decodes it into a string. The data typically contains the HTTP request.
            rd = clientsocket.recv(5000).decode()

            #processing the request
            pieces = rd.split('\n')
            if len(pieces) > 0:
                #prints out the http request method
                print(pieces[0])

            #sending a http response
            data = 'HTTP/1.1 200 ok\r\n'
            data += "Content-Type: text/html; charset=UTF-8\r\n"
            data += "\r\n"
            data += "<html><body>Hello World</body></html>\r\n\r\n"

            #The response is sent to the client via the clientsocket.
            clientsocket.sendall(data.encode())
            #This shuts down the writing side of the client socket to indicate that the server has finished sending data.
            clientsocket.shutdown(SHUT_WR)
    #If the server is interrupted (e.g., by pressing Ctrl+C), it gracefully shuts down.If any other exception occurs, it prints the error message.
    except KeyboardInterrupt:
        print("shutting down.....")
    except Exception as exc:
        print("Error:\n")
        print(exc)

    #The server socket is closed when the program terminates.
    server_socket.close()

print('Access http://localhost:9000')
create_server()

```

## Creating a server and Reading the Data from the Server

### The Server Sending The Data

```python
import socket

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    server_socket.bind(('localhost', 9000))
    server_socket.listen(5)

    while True:
        (clientsocket, address) = server_socket.accept()

        request = clientsocket.recv(5000).decode()
        pieces = request.split('\n')
        if len(pieces) > 0:
            #print the request method
            print(pieces[0])

        if '/romeo.txt' in pieces[0]:
            with open('romeo.txt', 'r') as file:
                file_content = file.read()

            response = 'HTTP/1.1 200 OK\r\n'
            response += 'Content-Type: text/plain\r\n\r\n'
            response += file_content

            clientsocket.sendall(response.encode())
        else:
            response = 'HTTP/1.1 404 Not Found\r\n\r\n'
            clientsocket.sendall(response.encode())

        clientsocket.shutdown(socket.SHUT_WR)
except KeyboardInterrupt:
    print("Shutting down...")
finally:
    server_socket.close()

```

### The client Reading the data

```python
#Reading Data from a server
#The urllib.request module is part of Python’s standard library and is used for opening and reading URLs. It allows interaction with web pages or APIs via HTTP.
import urllib.request

#This line sends an HTTP request to the local server at http://127.0.0.1:9000/romeo.txt. The IP 127.0.0.1 (or localhost) refers to the local machine.The function urlopen() returns a file-like object (fhand) that represents the content of the response (in this case, it’s expected to be the text of romeo.txt).

fhand = urllib.request.urlopen('http://127.0.0.1:9000/romeo.txt')
#This loop iterates over each line in the response (i.e., the content of the romeo.txt file).
for line in fhand:
    print(line.decode().strip())
```

## SQL COMMANDS

```sql

INSERT INTO Users(name, email) VALUES ('kristen','kristen@gmail.com');

DELETE FROM Users WHERE email='ted@unich.edu';

UPDATE Users SET name="Charles" WHERE email='cvdev@gmailcom';

SELECT * FROM Users;

SELECT * FROM Users WHERE email="kristen@gmail.com";

SELECT * FROM Users ORDER BY email;

SELECT * FROM Users ORDER BY name DESC;

DROP TABLE Users;

```

## DJANGO ORM COMMANDS

```python
from .models import User

user = User(name="sally", email="sally@gmail.com")
user.save()

User.objects.values()
User.objects.filter(email="sally@gmail.com").values()
User.objects.filter(email="sally@gmail.com").delete()
User.objects.values()
User.objects.values().order_by('email')
User.objects.values().order_by('-name')

```

## Django Model Fields Types

1. AutoField
2. BigAutoField
3. BigIntegerField
4. BinaryField
5. BooleanField
6. CharField
7. DateField
8. DateTimeField
9. DecimalField
10. EmailField
11. FileField
12. FilePathField
13. FloatField
14. ImageField
15. IntergerField
16. GenericIPAddressField
17. NullBooleanField
18. PositiveIntegerField
19. PositiveSmallIntegerField
20. SlugField
21. SmallIntegerField
22. TextField
23. TimeField
24. URLField
25. ForeignKey
26. ManyToManyField
27. OneToOneField

## Django Commands

```sh
pip install -r requirements.txt #to make sure that all the utilities are there
python manage.py check #make sure that things are setup
python manage.py makemigrations #creating the sql migration files
rm db.sqlite3 #deleting the database
python manage.py migrate #create the database and the tables
python manage.py shell #interact with the database
```
