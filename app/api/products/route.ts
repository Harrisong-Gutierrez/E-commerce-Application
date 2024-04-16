import { createClient } from "@/utils/supabase/client";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();

export const GET = async (request: NextRequest) => {
    try {
        const { data: products, error } = await supabase.from("products").select("*");
        if (error) {
            console.error("Error fetching products:", error.message);
            return NextResponse.json(
                { message: "Failed to fetch products", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Products fetched successfully", products },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching products:", error.message);
        return NextResponse.json(
            { message: "Failed to fetch products", error: error.message },
            { status: 500 }
        );
    }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { name, description, price, available } = await request.json();
        const { data: product, error } = await supabase.from("products").insert([{ name, description, price, available }]);
        if (error) {
            console.error("Error adding product:", error.message);
            return NextResponse.json(
                { message: "Failed to add product", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Product added successfully", product },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding product:", error.message);
        return NextResponse.json(
            { message: "Failed to add product", error: error.message },
            { status: 500 }
        );
    }
};

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, name, description, price, available } = await request.json();
        const { data: product, error } = await supabase.from("products").update({ name, description, price, available }).eq('id', id);
        if (error) {
            console.error("Error updating product:", error.message);
            return NextResponse.json(
                { message: "Failed to update product", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Product updated successfully", product },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating product:", error.message);
        return NextResponse.json(
            { message: "Failed to update product", error: error.message },
            { status: 500 }
        );
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id } = await request.json();
        const { error } = await supabase.from("products").delete().eq('id', id);
        if (error) {
            console.error("Error deleting product:", error.message);
            return NextResponse.json(
                { message: "Failed to delete product", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting product:", error.message);
        return NextResponse.json(
            { message: "Failed to delete product", error: error.message },
            { status: 500 }
        );
    }
};