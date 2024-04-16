import { createClient } from "@/utils/supabase/client";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();



export const GET = async (request: NextRequest) => {
    try {
        const { data: cartDetails, error } = await supabase.from("cart_details").select("*");
        if (error) {
            console.error("Error fetching cart Details:", error.message);
            return NextResponse.json(
                { message: "Failed to fetch cart Details", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "CartDetails fetched successfully", cartDetails },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching cart Details:", error.message);
        return NextResponse.json(
            { message: "Failed to fetch cart Details", error: error.message },
            { status: 500 }
        );
    }
};


export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, cart_id, product_id, quantity } = await request.json();
        const { data: cartDetails, error } = await supabase.from("cart_details").insert([{ id, cart_id, product_id, quantity }]);
        if (error) {
            console.error("Error adding cartDetails:", error.message);
            return NextResponse.json(
                { message: "Failed to add cartDetails", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "cartDetails added successfully", cartDetails },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding cartDetails:", error.message);
        return NextResponse.json(
            { message: "Failed to add cartDetails", error: error.message },
            { status: 500 }
        );
    }
};


export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, cart_id, product_id, quantity } = await request.json();
        const { data: cartDetails, error } = await supabase.from("cart_details").update({ id, cart_id, product_id, quantity }).eq('id', id);
        if (error) {
            console.error("Error updating cartDetails:", error.message);
            return NextResponse.json(
                { message: "Failed to update cartDetails", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "cartDetails updated successfully", cartDetails },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating cartDetails:", error.message);
        return NextResponse.json(
            { message: "Failed to update cartDetails", error: error.message },
            { status: 500 }
        );
    }
};



export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id } = await request.json();
        const { error } = await supabase.from("cart_details").delete().eq('id', id);
        if (error) {
            console.error("Error deleting cart Details:", error.message);
            return NextResponse.json(
                { message: "Failed to delete cart Details", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "cartDetails History deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting cart Details:", error.message);
        return NextResponse.json(
            { message: "Failed to delete  cart Details", error: error.message },
            { status: 500 }
        );
    }
};