import { databases, databaseId, collectionId, ID } from "./appwrite";
import { Product } from "@/app/dashboard/components/types";
import { Query } from "appwrite";

export const getProducts = async (userId: string): Promise<Product[]> => {
    try {
        const response = await databases.listDocuments(
            databaseId,
            collectionId,
            [Query.equal("userId", userId)]
        );

        return response.documents.map((doc) => ({
            id: doc.$id,
            name: doc.name,
            sku: doc.sku,
            quantity: doc.quantity,
            price: doc.price,
        }));
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const addProduct = async (product: Omit<Product, "id">, userId: string): Promise<Product | null> => {
    try {
        // Explicitly remove id if it exists in the runtime object
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = product as any;

        const response = await databases.createDocument(
            databaseId,
            collectionId,
            ID.unique(),
            {
                ...data,
                userId,
            }
        );

        return {
            id: response.$id,
            name: response.name,
            sku: response.sku,
            quantity: response.quantity,
            price: response.price,
        };
    } catch (error) {
        console.error("Error adding product:", error);
        return null;
    }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
    try {
        // Remove id from the update payload if present
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, ...data } = product;

        const response = await databases.updateDocument(
            databaseId,
            collectionId,
            id,
            data
        );

        return {
            id: response.$id,
            name: response.name,
            sku: response.sku,
            quantity: response.quantity,
            price: response.price,
        };
    } catch (error) {
        console.error("Error updating product:", error);
        return null;
    }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        await databases.deleteDocument(
            databaseId,
            collectionId,
            id
        );
        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
};
