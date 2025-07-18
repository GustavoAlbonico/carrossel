# Carrossel
Modelos de carrossel simples criado para utilizar em projetos, (é responsivo e personalizável)
Utilizando html, css, jquery

**Modelos:**

- [Carrossel Infinito](https://gustavoalbonico.github.io/carrossel/index.html)
    <a href="https://gustavoalbonico.github.io/carrossel/index.html"><p><img src="public/carrossel-infinito.png" width="800"/></p></a>
- [Carrossel Finito](https://gustavoalbonico.github.io/carrossel/index.html)
    <a href="https://gustavoalbonico.github.io/carrossel/index.html"><p><img src="public/carrossel-finito.png" width="800"/></p></a>
- [Carrossel Finito de 4 itens mas tem 2](https://gustavoalbonico.github.io/carrossel/index.html)
    <a href="https://gustavoalbonico.github.io/carrossel/index.html"><p><img src="public/carrossel-finito-4-itens.png" width="800"/></p></a>
- [Carrosel Finito com css customizado](https://gustavoalbonico.github.io/carrossel/index.html)
    <a href="https://gustavoalbonico.github.io/carrossel/index.html"><p><img src="public/carrossel-finito-personalizado.png" width="800"/></p></a>

**Utilização:**

- Copiar os arquivos carrossel.css, carrossel.js e a estrutura do "carrossel-customizado-container"
- Adicionar no html acima do import do carrossel.js -> <script src="htt ps://cdn-script.com/ajax/libs/jquery/3.7.1/jquery.js"></script>
- Para o carrossel ser infinito basta adicionar a classe infinito no botões: </br>
    - carrossel-customizado-btn-proximo
    - carrossel-customizado-btn-anterior
- O Carrossel Finito precisa ter a classe  carrossel-customizado-btn-disabled no botão carrossel-customizado-btn-anterior
- Variaveis que vc pode utilizar no css para customizar:
    - --carrossel-width
    - --carrossel-height
    - --carrossel-itens-visiveis
    - --carrossel-itens-gap
    - --carrossel-item-width
    - --carrossel-animation-duration

**Exemplos:**

```css
@media(min-width: 1025px) {
    #carrossel1.carrossel-customizado-container {
        --carrossel-itens-visiveis: 3;
    }

    #carrossel4.carrossel-customizado-container {
        --carrossel-width: 80vw;
        --carrossel-itens-visiveis: 5;
    }
}

@media(max-width: 1024px) {
    #carrossel1.carrossel-customizado-container {
        --carrossel-width: 80vw;
        --carrossel-itens-visiveis: 3;
    }
}

@media(max-width: 768px) {
    #carrossel1.carrossel-customizado-container {
        --carrossel-width: 90vw;
        --carrossel-itens-visiveis: 2;
    }
}

@media(max-width: 425px) {
    #carrossel4.carrossel-customizado-container {
        --carrossel-width: 90vw;
        --carrossel-height: 300px;
        --carrossel-itens-visiveis: 2;
    }
}
```

- Além disso possui exemplos no arquivo css "carrossel-custom.css".
