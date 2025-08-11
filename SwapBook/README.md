# SWAPBOOKV3

Seja bem-vindo ao modelo de contrato para swaps de moedas da plataforma webdex.
Segue abaixo um guia para você iniciar o projeto e implantar o contrato na rede Sepolia.

---

### Comando Inicial
Após clonar o repositório, rode o comando abaixo para instalar as dependências do Node.js.

```shell
npm i
```

### Variáveis de ambiente
Certifique-se de criar um arquivo *.env* na raiz do diretório, o mesmo não deve ser compartilhado no github, portanto, coloque-o no .gitignore caso exista caso não, crie esse arquivo. Os parametros do arquivo .env estarão especificados no .env.example.
```shell
RPC_NODE=
CHAIN_ID=
PRIVATE_KEY=
OwnerAddress=
```

<ul style="color: rgba(188, 152, 46, 1);">
<li>
<strong>RPC_NODE:</strong> Contém a URL da API da rede (por exemplo, Sepolia), obtida de serviços como <a href="https://infura.io/" target="_blank">Infura</a> ou <a href="https://www.alchemy.com/" target="_blank">Alchemy</a>.
</li>
<li>
<strong>PRIVATE_KEY:</strong> A chave privada da sua carteira, obtida da MetaMask. Vá em "Detalhes da conta" e clique em "Exportar Chave Privada".
</li>
<li>
<strong>OwnerAddress:</strong> O endereço da carteira que será o dono inicial do contrato.
</li>
</ul>


### Comando para fazer o deploy do contrato na Sepolia 
```shell
npx hardhat ignition deploy ignition/modules/WebdexSwapBookV3.js --network sepolia
```
#### Explicação do comando:

<ul>
<li><code>npx hardhat ignition deploy</code>: Inicia a ferramenta de deploy do Hardhat Ignition.</li>
<li><code>ignition/modules/WebdexSwapBookv3.js</code>: Informa ao Hardhat qual arquivo de módulo ele deve usar.</li>
<li><code>--network sepolia</code>: Especifica a rede para o deploy.</li>
</ul>

<p style="color: rgb(209, 105, 222);">
Se sua carteira tiver ETH suficiente na rede Sepolia, o Hardhat vai:</p>
<ol>
<li>Compilar o contrato.</li>
<li>Criar a transação de deploy com os argumentos definidos.</li>
<li>Assinar e enviar a transação.</li>
<li>Aguardar a confirmação.</li>
<li>Imprimir o endereço do contrato implantado.</li>
</ol>

Se tiver algum problema, como "insufficient funds" (fundos insuficientes), use uma <a href="https://sepoliafaucet.com/" target="_blank">faucet</a> da Sepolia para obter ETH de teste. Se o problema for outro, a mensagem de erro do Hardhat geralmente é bem descritiva.