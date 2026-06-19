# 🛠️ Tudo-em-Um

Uma aplicação web "tudo-em-um" com projetos CRUD essenciais que todo programador deve ter no portfólio. Todos os dados são persistidos usando localStorage, sem necessidade de banco de dados.

## 📋 Funcionalidades

### 1. 🧮 Calculadora
- Operações básicas: adição, subtração, multiplicação, divisão
- Interface moderna com display e botões estilizados
- Suporte para números decimais
- Função de backspace e limpar

### 2. 🔄 Conversores

#### Conversor de Temperatura
- Celsius (°C)
- Fahrenheit (°F)
- Kelvin (K)
- Conversão entre qualquer par de unidades

#### Conversor de Moeda
- Real (BRL)
- Dólar (USD)
- Euro (EUR)
- Libra (GBP)
- Taxas de câmbio simuladas para demonstração

#### Conversor de Tempo
- Segundos
- Minutos
- Horas
- Dias
- Conversão entre qualquer par de unidades

### 3. ✅ To-Do List
- Adicionar novas tarefas
- Marcar tarefas como concluídas
- Excluir tarefas
- Filtrar por: Todas, Pendentes, Concluídas
- Limpar todas as tarefas concluídas
- Contador de tarefas pendentes
- **Persistência em localStorage** - as tarefas são salvas automaticamente

## 🚀 Como Usar

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em seu navegador
3. Navegue entre as ferramentas usando as abas no topo

## 🛠️ Tecnologias

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (Vanilla)** - Lógica e interatividade
- **localStorage API** - Persistência de dados

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop
- Tablet
- Mobile

## 💾 Persistência de Dados

A To-Do List utiliza o `localStorage` do navegador para persistir as tarefas. Isso significa que:
- As tarefas permanecem salvas mesmo após fechar o navegador
- Não é necessário configurar banco de dados
- Os dados são armazenados localmente no dispositivo do usuário

## 🎨 Design

- Interface moderna com gradientes
- Design limpo e intuitivo
- Animações suaves nas interações
- Cores agradáveis e acessíveis
- Ícones emoji para identificação visual

## 📝 Estrutura do Projeto

```
tudo-em-um/
├── index.html      # Estrutura HTML principal
├── styles.css      # Estilos CSS
├── script.js       # Lógica JavaScript
└── README.md       # Documentação
```

## 🔧 Personalização

### Taxas de Câmbio
As taxas de câmbio no conversor de moeda são simuladas. Para usar taxas reais, modifique o objeto `exchangeRates` no arquivo `script.js`:

```javascript
const exchangeRates = {
    BRL: 1,
    USD: 0.20,  // Atualize com a taxa real
    EUR: 0.18,  // Atualize com a taxa real
    GBP: 0.16   // Atualize com a taxa real
};
```

## 🎯 Objetivo

Este projeto foi criado para demonstrar habilidades essenciais de desenvolvimento web:
- Manipulação do DOM
- Gerenciamento de estado
- Persistência de dados com localStorage
- Design responsivo
- JavaScript modular e organizado

## 📄 Licença

Este projeto é open source e está disponível para uso educacional.
