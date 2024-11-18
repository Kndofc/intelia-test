# Teste Técnico - Intelia

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Full Stack Júnior na **Intelia**. O objetivo é implementar um formulário de cadastro dividido em três etapas, com salvamento progressivo no banco de dados, validações e máscaras nos campos.

---

## Funcionalidades

1. **Cadastro em Três Etapas**:
   - **Passo 1**: Nome completo e data de nascimento.
   - **Passo 2**: Endereço (rua, número, CEP, cidade e estado).
   - **Passo 3**: Contatos (telefone fixo e celular).

2. **Salvamento Progressivo**:
   - Cada etapa é salva no banco de dados ao ser concluída.
   - Caso o navegador seja fechado, o usuário pode retomar o preenchimento de onde parou.

3. **Validações e Máscaras**:
   - Validações de entrada em todos os campos.
   - Máscaras aplicadas para os campos de CEP, telefone e celular.

4. **Frontend Responsivo**:
   - Desenvolvido em **React** com **Material-UI (MUI)** para um acabamento visual moderno.
   - Design adaptável para dispositivos móveis.

5. **Backend Estruturado**:
   - Desenvolvido com **Symfony**, seguindo boas práticas de arquitetura e programação.

6. **APIs RESTful**:
   - Endpoints para salvar e recuperar dados do usuário, com documentação automatizada em **OpenAPI**.

---

## URLs do Projeto

- **Frontend**: [https://cafe.autonomus.app/](https://cafe.autonomus.app/)
- **Backend**: [https://new.autonomus.app](https://new.autonomus.app)
- **Documentação da API (Swagger)**: [https://new.autonomus.app/api/doc](https://new.autonomus.app/api/doc)

---

## Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- Web Components (Custom Progress Bar)

### Backend
- PHP 8.1
- Symfony 6.2
- Doctrine ORM
- MySQL

### Testes
- PHPUnit
- React Testing Library

---

## Instruções de Implantação

### Requisitos
- **Frontend**: Node.js (>= 18) e npm/yarn
- **Backend**: PHP 8.1, Composer, MySQL, Symfony CLI

### Configuração do Banco de Dados
Execute o script abaixo para criar a estrutura do banco de dados:
```sql
CREATE DATABASE intelia_test;
USE intelia_test;

CREATE TABLE user_registration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    street VARCHAR(255) DEFAULT NULL,
    number INT DEFAULT NULL,
    zip_code VARCHAR(8) DEFAULT NULL,
    city VARCHAR(255) DEFAULT NULL,
    state VARCHAR(2) DEFAULT NULL,
    phone VARCHAR(255) DEFAULT NULL,
    mobile VARCHAR(255) DEFAULT NULL
);
```

### Backend
1. Clone o repositório:
   ```bash
   git clone https://github.com/kndofc/intelia-test.git
   cd intelia-test/backend
   ```

2. Instale as dependências:
   ```bash
   composer install
   ```

3. Configure o arquivo `.env` para apontar para o banco de dados:
   ```
   DATABASE_URL="mysql://root:admin@127.0.0.1:3306/intelia_test"
   ```

4. Execute as migrações para criar as tabelas automaticamente:
   ```bash
   php bin/console doctrine:migrations:migrate
   ```

5. Inicie o servidor local:
   ```bash
   symfony server:start
   ```

---

### Frontend
1. Acesse o diretório do frontend:
   ```bash
   cd ../frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` (se necessário) para apontar para a API:
   ```
   REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

---

### Acessando o Sistema
- **Frontend**: [https://cafe.autonomus.app/](https://cafe.autonomus.app/)
- **Backend**: [https://new.autonomus.app](https://new.autonomus.app)

---

## Estrutura de Código

### Backend
- **Controller**: Gerencia as requisições e interações com os serviços.
- **Service**: Contém a lógica de negócio.
- **Entity**: Representa as tabelas do banco de dados.
- **Repository**: Consultas customizadas ao banco de dados.

### Frontend
- **Components**: Componentes reutilizáveis (botões, tabelas, etc.).
- **Pages**: Páginas principais (etapas do cadastro, home, consulta).
- **Services**: Configuração da API para comunicação com o backend.
- **Styles**: Estilos personalizados.

---

## Testes

### Backend
Os testes incluem:
- Testes unitários para `UserRegistrationService`.
- Testes de integração para os endpoints da API (`UserRegistrationController`).

Execute os testes com:
```bash
php bin/phpunit
```

### Frontend
Os testes incluem:
- Testes de renderização e validação de formulários (`Step1` e `Step2`).

Execute os testes com:
```bash
npm test
```

---

## Melhorias Futuras
1. Adicionar logs detalhados no backend.
2. Refatorar para utilizar um padrão global de respostas.
3. Incluir autenticação e segurança adicional nas APIs.
4. Melhorar a acessibilidade (A11y) do frontend.

---

## Contato
Caso tenha dúvidas, entre em contato:
- **Nome**: Kauan Lopes
- **E-mail**: kauan.lopess@outlook.com
- **Telefone**: (11) 96211-4156
```