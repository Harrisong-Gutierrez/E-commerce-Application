import { createClient } from "@/utils/supabase/client";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();


export const GET = async (request: NextRequest) => {
    try {
        const { data: carts, error } = await supabase.from("shopping_carts").select("*");
        if (error) {
            console.error("Error fetching carts:", error.message);
            return NextResponse.json(
                { message: "Failed to fetch carts", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Carts fetched successfully", carts },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching carts:", error.message);
        return NextResponse.json(
            { message: "Failed to fetch carts", error: error.message },
            { status: 500 }
        );
    }
};


export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, user_id, creation_date } = await request.json();
        const { data: carts, error } = await supabase.from("shopping_carts").insert([{ id, user_id, creation_date }]);
        if (error) {
            console.error("Error adding carts:", error.message);
            return NextResponse.json(
                { message: "Failed to add carts", error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Carts added successfully", carts },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding carts:", error.message);
        return NextResponse.json(
            { message: "Failed to add carts", error: error.message },
            { status: 500 }
        );
    }
};

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, user_id, creation_date } = await request.json();
        const { data: carts, error } = await supabase.from("shopping_carts").update({ id, user_id, creation_date }).eq('id', id);
        if (error) {
            console.error("Error updating carts:", error.message);
            return NextResponse.json(
                { message: "Failed to update carts", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Carts updated successfully", carts },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating carts:", error.message);
        return NextResponse.json(
            { message: "Failed to update carts", error: error.message },
            { status: 500 }
        );
    }
};


export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id } = await request.json();
        const { error } = await supabase.from("shopping_carts").delete().eq('id', id);
        if (error) {
            console.error("Error deleting carts:", error.message);
            return NextResponse.json(
                { message: "Failed to delete carts", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Carts deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting carts:", error.message);
        return NextResponse.json(
            { message: "Failed to delete carts", error: error.message },
            { status: 500 }
        );
    }
};