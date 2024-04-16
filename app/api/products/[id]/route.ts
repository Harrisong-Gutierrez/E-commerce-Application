import { createClient } from "@/utils/supabase/client";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();









export const GET = async (
    request: NextRequest,
    { params }: { params: { id: number } }
) => {
    try {
        const id = params.id;

        const { data: productsData, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching products:", error);
            return NextResponse.json(
                { message: "Failed to fetch products", error },
                { status: 500 }
            );
        }

        if (!productsData) {
            return NextResponse.json({ message: "products not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "products fetched successfully", products: productsData },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Failed to fetch products", error },
            { status: 500 }
        );
    }
};