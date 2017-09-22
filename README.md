# azure-cosmos-hello-world

## Run this hello-world program
1. Create ResourceGroup
    
    az group create --name myResourceGroup --location "China East"  
2. Create Account
    
    az cosmosdb create --name &lt;cosmosdb-name&gt; --resource-group myResourceGroup --kind GlobalDocumentDB  
3. NPM install
    
    npm install  
4. Run

    node hello.js 
