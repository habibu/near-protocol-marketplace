import { PersistentUnorderedMap, 
        context,
        ContractPromiseBatch  } from "near-sdk-as";
import { listedProducts, Product } from "./model";


export const products = new PersistentUnorderedMap<string, string>("PRODUCTS");

export function setProduct(product: Product): void {
    const storedProduct = listedProducts.get(product.id);
    if(storedProduct !== null){
        throw new Error(`a product with ${product.id} already exists`);
        
    }
    listedProducts.set(product.id, Product.fromPayload(product));
    
}

export function getProduct(id: string): Product | null {
    return listedProducts.get(id);
}

export function getProducts(): Product[] {
    return listedProducts.values();
}

export function buyProduct(productId: string): void {
    const product = getProduct(productId);
    if(product == null) {
        throw new Error("product not found error");
    }
    if(product.price.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposite should be equal to the product's price");
        
    }
    ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit);
    product.incrementSoldAmount();
    listedProducts.set(product.id, product);
}