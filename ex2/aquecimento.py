import requests
import json


with open('.env') as f:
    token = f.read()
    
def exercicio1():
    data = requests.get('http://clav-api.di.uminho.pt/v2/classes/c750?token=' + token).json()
    data = data['filhos']
    codigos = []
    processos = []
    for el in data:
        codigos.append(el['codigo'])
        
    for codigo in codigos:
        data = requests.get(f'http://clav-api.di.uminho.pt/v2/classes/c{codigo}?token=' + token).json()
        data = data['filhos']
        for el in data:
            processos.append(el['codigo'])

    print("Exercicio 1")
    print("Processos: ", processos)
    print("Número: ", len(processos))

def exercicio2():
    data = requests.get('http://clav-api.di.uminho.pt/v2/entidades?token=' + token).json()

    print("Exercicio 2")
    print(len(data))

def exercicio3():
    data = requests.get('http://clav-api.di.uminho.pt/v2/classes/c750.20/descendencia?token=' + token).json()

    print("Exercicio 3")
    print(len(data))

def exercicio4():
    data = requests.get('http://clav-api.di.uminho.pt/v2/classes/c750.20.600?token=' + token).json()
    
    data = data["processosRelacionados"]

    print("Exercicio 4")
    print(len(data))

exercicio1()
exercicio2()
exercicio3()
exercicio4()